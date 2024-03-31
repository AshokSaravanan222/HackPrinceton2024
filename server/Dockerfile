# Use an official Python 3.12 runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable placeholders
ENV OPENAI_API_KEY=your_openai_api_key_here
ENV VERBWIRE_API_KEY=your_verbwire_api_key_here
ENV MONGODB_URI=your_mongodb_uri_here

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]