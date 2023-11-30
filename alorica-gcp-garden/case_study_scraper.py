from bs4 import BeautifulSoup

# Your HTML content goes here
with open('alorica_case_study.html', 'r') as file:
    html_content = file.read()


# Base URL for constructing full links
base_url = "https://www.alorica.com"

# Parse the HTML
soup = BeautifulSoup(html_content, "html.parser")

# Find all case study blocks
case_studies = soup.find_all("div", class_="insight-card-content")

# Extract information from each case study
for case in case_studies:
    title_tag = case.find("h6")
    if title_tag and title_tag.find("a"):
        title = title_tag.get_text(strip=True)
        link = base_url + title_tag.find("a")["href"]
        summary = case.find("div", class_="insight-card-summary").get_text(strip=True)
        print(f"{title}: \n{summary} \nRead more here: {link}\n")

