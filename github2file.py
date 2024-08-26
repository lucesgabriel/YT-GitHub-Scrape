import sys
import requests
import base64

def download_repo(repo_url):
    # Extract owner and repo name from URL
    parts = repo_url.split('/')
    owner = parts[-2]
    repo = parts[-1]

    # GitHub API URL
    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"

    # Make a request to the GitHub API
    response = requests.get(api_url)
    if response.status_code != 200:
        print(f"Failed to fetch repository contents: {response.status_code}")
        return

    # Process and save the content
    content = ""
    for item in response.json():
        if item['type'] == 'file':
            file_content = requests.get(item['download_url']).text
            content += f"File: {item['name']}\n\n{file_content}\n\n"

    # Save to a file
    output_file = f"{repo}_content.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(output_file)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python github2file.py <repository_url>")
    else:
        download_repo(sys.argv[1])