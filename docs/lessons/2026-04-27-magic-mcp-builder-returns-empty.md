# Lesson: Magic MCP Builder Returns [object Object]

## Problem
Called `mcp__magic__21st_magic_component_builder` expecting generated component code. The tool returned `[object Object]` — an empty/serialization failure — with no usable scaffold.

## Fix
Fell back to the inspiration output from `mcp__magic__21st_magic_component_inspiration` (which worked correctly), identified the best-matching candidate (FUIBentoGridDark, 5/6 criteria), then wrote the component from scratch using the implementation spec.

## Why It Happened
The builder tool returns a raw JavaScript object that the MCP layer fails to serialize to a string. This appears to be an intermittent issue with the Magic MCP bridge, not a parameters error.

## What to Watch For
- Always treat `mcp__magic__21st_magic_component_builder` output as unreliable — it may return `[object Object]` instead of code.
- The inspiration tool (`mcp__magic__21st_magic_component_inspiration`) is reliable for finding pattern references.
- When the builder fails, the inspiration candidates + the implementation spec are sufficient to write the component from scratch.
