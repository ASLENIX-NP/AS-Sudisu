import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content

    # Replace straight quotes
    # e.g. "http://localhost:5001/api/settings" -> import.meta.env.VITE_API_BASE_URL + "/settings"
    # Wait, some places use "http://localhost:5001/api" exactly (e.g. in api.js)
    content = content.replace('"http://localhost:5001/api"', 'import.meta.env.VITE_API_BASE_URL')
    content = content.replace('"http://localhost:5001/api/', 'import.meta.env.VITE_API_BASE_URL + "/')
    
    # Replace single quotes just in case
    content = content.replace("'http://localhost:5001/api'", 'import.meta.env.VITE_API_BASE_URL')
    content = content.replace("'http://localhost:5001/api/", "import.meta.env.VITE_API_BASE_URL + '/")

    # Replace backticks
    # e.g. `http://localhost:5001/api/inquiries/${id}` -> `${import.meta.env.VITE_API_BASE_URL}/inquiries/${id}`
    content = content.replace('`http://localhost:5001/api/', '`${import.meta.env.VITE_API_BASE_URL}/')

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

def main():
    src_dir = 'frontend/src'
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.js') or file.endswith('.jsx'):
                process_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
