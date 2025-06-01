from app import create_app

app = create_app()

#checks if we are running directly. Protects against running the file if you are importing the file
if __name__ == "__main__":
    app.run(debug=True)
