# Use the official Python 3.12 image as the base
FROM python:3.12

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose port 5001 to the host machine
EXPOSE 5001

# Set the default command to run the application
CMD ["python", "init.py"]
