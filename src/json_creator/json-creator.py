import json

def create_element(element_type, element_id, name=None):
    if element_type == "IO":
        return {"name": name, "io": "input" if "output" in name.lower() else "output"}
    elif element_type == "FlipFlop":
        return {"id": element_id, "connections": [
            {"port": "clock"},
            {"port": "output"},
            {"port": "input"}
        ]}
    return {"id": element_id, "connections": []}

def add_connection(elements, connections, input_id, output_id, timing, input_port="0", output_port="0", input_io="0", output_io="0"):
    # Determine element types from the dictionaries
    print(input_io)
    print(output_io)
    if input_id in elements["LUTs"]:
        input_type = "lut"
    elif input_id in elements["FlipFlops"]:
        input_type = "DFF"
    else:
        input_type = elements["IOs"].get(input_id, {}).get("name")
    
    if output_id in elements["LUTs"]:
        output_type = "lut"
    elif output_id in elements["FlipFlops"]:
        output_type = "DFF"
    else:
        output_type = elements["IOs"].get(output_id, {}).get("name")
    if input_type is None or output_type is None:
        print(f"Error: One of the elements ({input_id}, {output_id}) does not exist.")
        return
    
    connection = {
        "Input": {
            "type": input_type,
            "id": str(input_id) if input_type != elements["IOs"].get(input_id, {}).get("name") else "0",
            "io": input_io if input_type=="DFF" else "output",
            "port": input_port if input_type == "lut" else "0"
        },
        "Output": {
            "type": output_type,
            "id": str(output_id) if output_type != elements["IOs"].get(output_id, {}).get("name") else "0",
            "io": output_io if output_type=="DFF" else "input",
            "port": output_port if output_type == "lut" else "0"
        },
        "Timing": timing
    }
    connections.append(connection)

def user_input():
    elements = {"LUTs": {}, "FlipFlops": {}, "IOs": {}}
    connections = []
    
    # Creating elements
    while True:
        element_type = input("Enter element type (LUT, FlipFlop, IO) or 'done' to finish: ")
        if element_type.lower() == 'done':
            break
        if element_type != "IO":
            while True:
                element_id = input("Enter element ID (numeric): ")
                if element_id.isdigit():
                    break
                else:
                    print("Invalid input. Please enter a numeric ID.")
            key = element_id
            elements[element_type + "s"][key] = create_element(element_type, key)
            if element_type == "LUT":
                # For LUTs, let the user add port definitions
                while True:
                    add_port = input(f"Do you want to add a port for {element_type} with ID {element_id}? (yes/no): ")
                    if add_port.lower() != "yes":
                        break
                    port_io = input("Enter port's io (input/output): ")
                    port_id = input("Enter port id: ")
                    elements[element_type + "s"][key]["connections"].append({
                        "io": port_io,
                        "id": port_id
                    })
            elif element_type == "FlipFlop":
                # For FlipFlops, automatically add the three ports.
                elements[element_type + "s"][key]["connections"] = [
                    {"port": "clock"},
                    {"port": "output"},
                    {"port": "input"}
                ]
        else:
            name = input("Enter name (for IO element): ")
            key = name
            elements["IOs"][key] = create_element("IO", key, name)
    
    # Adding global connections between elements
    while True:
        add_conn = input("Do you want to add a connection between elements? (yes/no): ")
        if add_conn.lower() != "yes":
            break
        
        input_id = input("Enter input element ID or IO name: ")
        output_id = input("Enter output element ID or IO name: ")
        
        # If the input element is a LUT or a DFF, prompt for its output port.
        input_port = "0"
        input_io = "0"
        if input_id in elements["LUTs"]:
            input_port = input("Enter the port number for the LUT output: ")
            if input_port == "":
                input_port = "0"
        if input_id in elements["FlipFlops"]:
            input_io = input("Enter the port number for the FlipFlop output: ")
            if input_io == "":
                input_io = "0"
        
        # If the output element is a LUT or a DFF, prompt for its input port.
        output_port = "0"
        output_io = "0"
        if output_id in elements["LUTs"]:
            output_port = input("Enter the port number for the LUT input: ")
            if output_port == "":
                output_port = "0"
        if output_id in elements["FlipFlops"]:
            print("test")
            output_io = input("Enter the port number for the FlipFlop input: ")
            if output_io == "":
                output_io = "0"

        try:
            timing = float(input("Enter timing value: "))
        except ValueError:
            print("Invalid timing value. Please enter a numeric value.")
            continue
        add_connection(elements, connections, input_id, output_id, timing, input_port, output_port, input_io, output_io)
    
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
    user_input()
