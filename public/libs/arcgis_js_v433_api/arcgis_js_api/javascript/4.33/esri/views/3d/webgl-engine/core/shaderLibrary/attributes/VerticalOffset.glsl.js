// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.33/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../chunks/vec42","../../../../../../core/libs/gl-matrix-2/factories/vec4f64","../util/ScreenSizePerspective.glsl","../util/View.glsl","../../shaderModules/Float4PassUniform","../../shaderModules/glsl"],(function(e,l,t,r,c,a,i){"use strict";const s=t.create();function o(e){e.uniforms.add(new a.Float4PassUniform("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:c,screenLength:a}=e.verticalOffset,i=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),o=t.camera.pixelRatio||1;return l.set(s,a*o,i,r,c)})))}e.VerticalOffset=function(e,l){const t=e.vertex;l.hasVerticalOffset?(o(t),l.hasScreenSizePerspective&&(e.include(r.ScreenSizePerspective),r.addScreenSizePerspectiveAlignment(t),c.addCameraPosition(e.vertex,l)),t.code.add(i.glsl`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${l.spherical?i.glsl`vec3 worldNormal = normalize(worldPos + localOrigin);`:i.glsl`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${l.hasScreenSizePerspective?i.glsl`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:i.glsl`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):t.code.add(i.glsl`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)},e.addVerticalOffset=o,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));