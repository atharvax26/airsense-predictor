import pickle

# Load city mapping
with open('city_mapping.pkl', 'rb') as f:
    city_mapping = pickle.load(f)

print("Available cities in the model:")
for city in sorted(city_mapping.keys()):
    print(f"  - {city}")
