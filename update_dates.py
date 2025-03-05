#!/usr/bin/env python3
import os
import re
import random
from datetime import datetime, timedelta

# Path to blog posts
posts_dir = "app/blog/posts"

# Start and end dates for the random range
start_date = datetime(2022, 1, 1)
end_date = datetime(2025, 1, 31)
date_range = (end_date - start_date).days

# Process each .mdx file
for filename in os.listdir(posts_dir):
    if filename.endswith(".mdx") and filename != "how-to-manifest.mdx":
        file_path = os.path.join(posts_dir, filename)
        
        # Read file content
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Generate random date
        random_days = random.randint(0, date_range)
        random_date = start_date + timedelta(days=random_days)
        formatted_date = random_date.strftime("%Y-%m-%d")
        
        # Replace date using regex
        updated_content = re.sub(r'date: "[0-9]{4}-[0-9]{2}-[0-9]{2}"', f'date: "{formatted_date}"', content)
        
        # Write updated content back to file
        with open(file_path, 'w') as f:
            f.write(updated_content)
        
        print(f"Updated {filename} with date {formatted_date}")

print("All blog post dates updated successfully!")