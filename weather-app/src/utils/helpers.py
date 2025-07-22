def format_temperature(temp):
    return f"{temp:.2f} °C"

def log_error(message):
    with open("error.log", "a") as log_file:
        log_file.write(f"ERROR: {message}\n")