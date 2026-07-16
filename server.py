import http.server
import socketserver
import socket
import sys

class DualStackHTTPServer(http.server.HTTPServer):
    def server_bind(self):
        # Force the socket to allow both IPv4 and IPv6 connections on the same port
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception:
            pass
        super().server_bind()

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add basic caching prevention for dev purposes
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    port = 8000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
        
    # Set address family to AF_INET6 to enable dual-stack sockets on supporting platforms (like Windows/Linux)
    DualStackHTTPServer.address_family = socket.AF_INET6
    
    # Binding to "" means bind to all available IPv4 and IPv6 interfaces
    server_address = ("", port)
    
    try:
        httpd = DualStackHTTPServer(server_address, MyHandler)
        print(f"Server successfully started on port {port} (supporting both http://127.0.0.1:{port} and http://localhost:{port})")
        print("Press Ctrl+C to stop.")
        httpd.serve_forever()
    except Exception as e:
        print(f"Error starting server: {e}", file=sys.stderr)
        sys.exit(1)
