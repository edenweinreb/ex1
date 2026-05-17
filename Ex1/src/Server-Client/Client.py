import socket
import sys

def main():
    if len(sys.argv) != 3:
        print(f"Usage: python3 {sys.argv[0]} <ip> <port>")
        sys.exit(1)

    ip = sys.argv[1]
    try:
        port = int(sys.argv[2])
    except ValueError:
        print("Error: Port must be an integer.")
        sys.exit(1)

    # Establish a single TCP connection for the entire session
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((ip, port))
    except Exception as e:
        print(f"Failed to connect to server: {e}")
        sys.exit(1)

    try:
        while True:
            # Read input without a prompt string, as required
            try:
                user_input = input()
            except EOFError:
                break 
            
            if not user_input:
                continue

            # Send raw input appended with a newline character
            message = user_input + "\n"
            client_socket.sendall(message.encode('utf-8'))

            # Block and wait for the server's response
            response = client_socket.recv(4096)
            
            # Empty response indicates server disconnected
            if not response:
                break
            
            print(response.decode('utf-8'), end='')

    except KeyboardInterrupt:
        pass
    finally:
        client_socket.close()

if __name__ == "__main__":
    main()