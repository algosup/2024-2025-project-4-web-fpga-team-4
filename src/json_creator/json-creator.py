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
    if input_id in elements["luts"]:
        input_type = "lut"
    elif input_id in elements["flipflops"]:
        input_type = "DFF"
    else:
        input_type = elements["ios"].get(input_id, {}).get("name")
    
    if output_id in elements["luts"]:
        output_type = "lut"
    elif output_id in elements["flipflops"]:
        output_type = "DFF"
    else:
        output_type = elements["ios"].get(output_id, {}).get("name")
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
    elements = {"luts": {}, "flipflops": {}, "ios": {}}
    connections = []
    
    # Creating elements
    while True:
        element_type = input("Enter element type (LUT, FlipFlop, IO) or 'done' to finish: ")
        element_type=element_type.lower()
        if element_type == 'done':
            break
        if element_type != "io":
            while True:
                element_id = input("Enter element ID (numeric): ")
                if element_id.isdigit():
                    break
                else:
                    print("Invalid input. Please enter a numeric ID.")
            key = element_id
            elements[element_type + "s"][key] = create_element(element_type, key)
            if element_type == "lut":
                # For LUTs, let the user add port definitions
                while True:
                    add_port = input(f"Do you want to add a port for {element_type} with ID {element_id}? (yes/no): ")
                    if add_port != "yes":
                        break
                    port_io = input("Enter port's io (input/output): ")
                    port_id = input("Enter port id: ")
                    elements[element_type + "s"][key]["connections"].append({
                        "io": port_io,
                        "id": port_id
                    })
            elif element_type == "flipflop":
                # For FlipFlops, automatically add the three ports.
                elements[element_type + "s"][key]["connections"] = [
                    {"port": "clock"},
                    {"port": "output"},
                    {"port": "input"}
                ]
        else:
            name = input("Enter name (for IO element): ")
            key = name
            elements["ios"][key] = create_element("IO", key, name)
    
    # Adding global connections between elements
    while True:
        add_conn = input("Do you want to add a connection between elements? (yes/no): ")
        if add_conn.lower() != "yes":
            break
        
        input_id = input("Enter input element ID or IO name: ")
        print(input_id)
        
        # If the input element is a LUT or a DFF, prompt for its output port.
        input_port = "0"
        input_io = "0"
        if input_id in elements["luts"]:
            input_port = input("Enter the port number for the LUT output: ")
            if input_port == "":
                input_port = "0"
        if input_id.lower()=="lut":
            input_id = input("Enter the id number for the LUT: ")
            while input_id not in elements["luts"]:
               input_id = input("This id does not exist, please try again.")
            input_port = input("Enter the port number for the LUT output: ")
            if input_port == "":
                input_port = "0"
        if input_id in elements["flipflops"]:
            input_io = input("Enter the port number for the FlipFlop output: ")
            if input_io == "":
                input_io = "0"
        if input_id.lower()=="flipflop":
            input_id = input("Enter the id number for the FlipFlop: ")
            while input_id not in elements["flipflops"]:
               input_id = input("This id does not exist, please try again.")
            input_io = input("Enter the port number for the FlipFlop output: ")
            if input_io == "":
                input_io = "0"

        output_id = input("Enter output element ID or IO name: ")
        print(output_id)
        
        # If the output element is a LUT or a DFF, prompt for its input port.
        output_port = "0"
        output_io = "0"
        if output_id in elements["luts"]:
            output_port = input("Enter the port number for the LUT input: ")
            if output_port == "":
                output_port = "0"
        if output_id.lower()=="lut":
            output_id = input("Enter the id number for the LUT: ")
            while output_id not in elements["luts"]:
                output_id = input("This id does not exist, please try again.")
            output_port = input("Enter the port number for the LUT input: ")
            if output_port == "":
                output_port = "0"
        if output_id in elements["flipflops"]:
            output_io = input("Enter the port number for the FlipFlop input: ")
            if output_io == "":
                output_io = "0"
        if output_id.lower()=="flipflop":
            output_id = input("Enter the id number for the FlipFlop: ")
            while output_id not in elements["flipflops"]:
                output_id = input("This id does not exist, please try again.")
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
        "LUTs": list(elements["luts"].values()),
        "FlipFlops": list(elements["FlipFlops"].values()),
        "IOs": list(elements["ios"].values()),
        "Connections": connections
    }
    
    with open("output.json", "w") as f:
        json.dump(json_output, f, indent=4)
    
    print("JSON file 'output.json' has been generated.")

if __name__ == "__main__":
    user_input()
