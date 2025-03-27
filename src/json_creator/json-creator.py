import json

def create_element(element_type, element_id, name=None):
    if element_type == "IO":
        return {"name": name, "type": "input" if "input" in name.lower() else "output", "id": str(element_id)}
    return {"id": element_id, "connections": []}

def add_connection(elements, connections, input_id, output_id, timing):
    connection = {
        "Input": {"type": "lut" if input_id in elements["LUTs"] else "DFF", "id": str(input_id), "io": "output", "port": "0"},
        "Output": {"type": "lut" if output_id in elements["LUTs"] else "DFF", "id": str(output_id), "io": "input", "port": "0"},
        "Timing": timing
    }
    connections.append(connection)

def generate_json():
    elements = {
        "LUTs": {
            "175": create_element("LUT", "175"),
            "173": create_element("LUT", "173")
        },
        "FlipFlops": {
            "0": create_element("FlipFlop", "0")
        },
        "IOs": {
            "0": create_element("IO", "0", "userInput")
        }
    }
    connections = []
    add_connection(elements, connections, "175", "173", 235.697)
    add_connection(elements, connections, "173", "0", 158.641)
    
    json_output = {
        "LUTs": list(elements["LUTs"].values()),
        "FlipFlops": list(elements["FlipFlops"].values()),
        "IOs": list(elements["IOs"].values()),
        "Connections": connections
    }
    
    with open("output.json", "w") as f:
        json.dump(json_output, f, indent=4)
    
    print("JSON file 'output.json' has been generated.")

if __name__ == "__main__":
    generate_json()
