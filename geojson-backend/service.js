import { OllamaLLM } from "./LLMs/Ollama.ts";

function getDataLLM() {
    const apiUrl = "http://135.222.40.6:11434";
    const model = "qwen3:4b";
    const sysPrompt = `You are a helpful assistant that use different tools to retrieve geojson data.

    When calling any of the available tools, you will only get the result of the tool call, not the actual data.
    In case of success, the data gets passed directly to the user.
    If there is some confusion, ask for clarification.
    `;
    const temperature = 0;
    const tools = [{
        type: "function",
        function: {
            name: "GetPopulation",
            description: "Return the population data"
        }
    }];

    return new OllamaLLM(apiUrl, model, sysPrompt, temperature, tools);
}

function handleToolCall(action, args, path, publicGeojsonDir, fs, validateGeoJSON, calculateBounds, getGeometryTypes, getPropertyKeys) {
    if (action === "GetPopulation") {
        const { data, error } = getPopulationGeoJSON(path, publicGeojsonDir, fs, validateGeoJSON, calculateBounds, getGeometryTypes, getPropertyKeys);
        if (!data) {
            return { result: error || "Something went wrong" };
        }
        return { result: `Data ${action} returned to the user successfully`, data };
    }
    return { result: "No data available" };
}


export function getPopulationGeoJSON(path, publicGeojsonDir, fs, validateGeoJSON, calculateBounds, getGeometryTypes, getPropertyKeys) {
    try {
        const filename = 'population_FeaturesToJSON.geojson';
        const filePath = path.join(publicGeojsonDir, filename);

        if (!fs.existsSync(filePath)) {
            return { error: 'File not found' };
        }

        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        const geojsonData = JSON.parse(content);
        const validation = validateGeoJSON(geojsonData);

        const publicPath = `/public/geojson/${filename}`;

        const fileInfo = {
            id: filename,
            name: filename,
            size: stats.size,
            uploadDate: stats.birthtime,
            modifiedDate: stats.mtime,
            publicPath,
            isPublic: true,
            isValid: validation.isValid,
            errors: validation.errors,
            warnings: validation.warnings,
            featureCount: geojsonData.features ? geojsonData.features.length : 0,
            bounds: calculateBounds(geojsonData),
            geometryTypes: getGeometryTypes(geojsonData),
            properties: getPropertyKeys(geojsonData),
            data: geojsonData
        };
        return { data: fileInfo };

    } catch (error) {
        return {
            error: 'Failed to read file',
            details: error.message
        };
    }
};


export async function getData(messages, path, publicGeojsonDir, fs, validateGeoJSON, calculateBounds, getGeometryTypes, getPropertyKeys) {
    const dataLLM = getDataLLM();
    const { message, tool_calls, think } = await dataLLM.chat(messages);
    if (tool_calls) {
        const allData = [];
        for (const toolCall of tool_calls) {
            console.log("Executing tool call:", toolCall);
            const { name: action, arguments: args } = toolCall.function;
            console.log("Tool call name:", action, "Arguments:", args);
            const { result, data } = handleToolCall(action, args, path, publicGeojsonDir, fs, validateGeoJSON, calculateBounds, getGeometryTypes, getPropertyKeys);
            console.log("Tool call result:", result);
            messages.push({
                role: "assistant",
                content: `I have to call ${action} with arguments: ${JSON.stringify(args)}`,
                tool_calls: [toolCall]
            });
            messages.push({
                role: "tool",
                content: result
            });
            if (data) {
                allData.push(data);
            }
        }
        return { ...await getData(messages), data: allData };
    }
    return { message, think };
}

