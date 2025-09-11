import logging
import os
from http import HTTPStatus
from typing import Generator

import requests
from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request, stream_with_context
from flask_cors import CORS

assert load_dotenv(override=True)

logger = logging.getLogger(__name__)

ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",") if o.strip()]
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8080"))
OLLAMALLM_HOST = os.getenv("OLLAMALLM_HOST", "localhost")
OLLAMALLM_PORT = os.getenv("OLLAMALLM_PORT", "11434")


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})

@app.post("/api/external/ollama/generate")
def _proxy_ollama_generate() -> tuple[Response, HTTPStatus]:

    problematic_headers = {
        "host",
        "origin",
        "referer",
        "sec-fetch-site",
        "sec-fetch-mode",
        "sec-fetch-dest",
        "sec-ch-ua",
        "sec-ch-ua-mobile",
        "sec-ch-ua-platform",
        "accept-encoding",
        "cache-control",
        "pragma",
        "connection",
    }

    headers = {k: v for k, v in request.headers if k.lower() not in problematic_headers}
    data = request.get_data()
    ollama_url = f"http://{OLLAMALLM_HOST}:{OLLAMALLM_PORT}/api/generate"

    logger.info(f"Forwarding request to Ollama at {ollama_url}")
    logger.info(f"Request headers: {dict(headers)}")
    logger.info(f"Request data length: {len(data)} bytes")

    headers["Content-Type"] = "application/json"
    headers["Accept"] = "application/json"
    headers["User-Agent"] = "FarmExpertAI-Proxy/1.0"

    try:
        ollama_response = requests.post(
            ollama_url,
            headers=headers,
            data=data,
            stream=True,
            timeout=300,
        )
    except requests.exceptions.RequestException as e:
        logger.error(f"Error connecting to Ollama: {e}")
        return (
            jsonify({"error": "Failed to connect to Ollama service"}),
            HTTPStatus.SERVICE_UNAVAILABLE,
        )
    except Exception as e:
        logger.error(f"Unexpected error in Ollama proxy: {e}")
        return (
            jsonify({"error": "Internal server error"}),
            HTTPStatus.INTERNAL_SERVER_ERROR,
        )

    if not ollama_response.ok:
        logger.error(
            f"Ollama request failed with status: {ollama_response.status_code}"
        )
        try:
            error_body = ollama_response.text
            logger.error(f"Ollama error response body: {error_body}")
        except Exception as e:
            logger.error(f"Could not read error response body: {e}")

        if ollama_response.status_code == 403:
            return (
                jsonify(
                    {
                        "error": "Ollama access forbidden",
                        "details": "Check Ollama CORS settings and host binding",
                    }
                ),
                HTTPStatus.FORBIDDEN,
            )
        else:
            return (
                jsonify(
                    {
                        "error": "Ollama service unavailable",
                        "status": ollama_response.status_code,
                    }
                ),
                HTTPStatus.INTERNAL_SERVER_ERROR,
            )

    def generate() -> Generator[bytes, None, None]:
        try:
            for chunk in ollama_response.iter_content(
                chunk_size=1024, decode_unicode=False
            ):
                if chunk:
                    yield chunk
        except Exception as e:
            logger.error(f"Error streaming from Ollama: {e}")
            yield b'{"error": "Stream interrupted"}\n'
        finally:
            ollama_response.close()

    response = Response(
        stream_with_context(generate()),
        status=ollama_response.status_code,
        content_type=ollama_response.headers.get("content-type", "application/json"),
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "X-Content-Type-Options": "nosniff",
        },
    )
    return response, HTTPStatus.OK


@app.post("/api/external/ollama/chat")
def _proxy_ollama_chat() -> tuple[Response, HTTPStatus]:

    problematic_headers = {
        "host",
        "origin",
        "referer",
        "sec-fetch-site",
        "sec-fetch-mode",
        "sec-fetch-dest",
        "sec-ch-ua",
        "sec-ch-ua-mobile",
        "sec-ch-ua-platform",
        "accept-encoding",
        "cache-control",
        "pragma",
        "connection",
    }

    headers = {k: v for k, v in request.headers if k.lower() not in problematic_headers}
    data = request.get_data()
    ollama_url = f"http://{OLLAMALLM_HOST}:{OLLAMALLM_PORT}/api/chat"

    logger.info(f"Forwarding request to Ollama at {ollama_url}")
    logger.info(f"Request headers: {dict(headers)}")
    logger.info(f"Request data length: {len(data)} bytes")

    headers["Content-Type"] = "application/json"
    headers["Accept"] = "application/json"
    headers["User-Agent"] = "FarmExpertAI-Proxy/1.0"

    try:
        ollama_response = requests.post(
            ollama_url,
            headers=headers,
            data=data,
            stream=True,
            timeout=300,
        )
    except requests.exceptions.RequestException as e:
        logger.error(f"Error connecting to Ollama: {e}")
        return (
            jsonify({"error": "Failed to connect to Ollama service"}),
            HTTPStatus.SERVICE_UNAVAILABLE,
        )
    except Exception as e:
        logger.error(f"Unexpected error in Ollama proxy: {e}")
        return (
            jsonify({"error": "Internal server error"}),
            HTTPStatus.INTERNAL_SERVER_ERROR,
        )

    if not ollama_response.ok:
        logger.error(
            f"Ollama request failed with status: {ollama_response.status_code}"
        )
        try:
            error_body = ollama_response.text
            logger.error(f"Ollama error response body: {error_body}")
        except Exception as e:
            logger.error(f"Could not read error response body: {e}")

        if ollama_response.status_code == 403:
            return (
                jsonify(
                    {
                        "error": "Ollama access forbidden",
                        "details": "Check Ollama CORS settings and host binding",
                    }
                ),
                HTTPStatus.FORBIDDEN,
            )
        else:
            return (
                jsonify(
                    {
                        "error": "Ollama service unavailable",
                        "status": ollama_response.status_code,
                    }
                ),
                HTTPStatus.INTERNAL_SERVER_ERROR,
            )

    def generate() -> Generator[bytes, None, None]:
        try:
            for chunk in ollama_response.iter_content(
                chunk_size=1024, decode_unicode=False
            ):
                if chunk:
                    yield chunk
        except Exception as e:
            logger.error(f"Error streaming from Ollama: {e}")
            yield b'{"error": "Stream interrupted"}\n'
        finally:
            ollama_response.close()

    response = Response(
        stream_with_context(generate()),
        status=ollama_response.status_code,
        content_type=ollama_response.headers.get("content-type", "application/json"),
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "X-Content-Type-Options": "nosniff",
        },
    )
    return response, HTTPStatus.OK


if __name__ == "__main__":
    app.run(host=HOST, port=PORT)
