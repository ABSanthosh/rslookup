output_file="./structure.json"

echo -n "{" > "$output_file"
echo -n "\"name\": \"$(basename "$(pwd)")\"," >> "$output_file"
echo -n "\"type\": \"folder\"," >> "$output_file"
echo -n "\"path\": \"/\"," >> "$output_file"
echo -n "\"children\": [" >> "$output_file"

first=true
while IFS= read -r -d $'\0' entry; do
    if [ "$first" = false ]; then
        echo -n "," >> "$output_file"
    else
        first=false
    fi

    echo -n "{" >> "$output_file"
    echo -n "\"name\": \"$(basename "$entry")\"," >> "$output_file"

    if [ -d "$entry" ]; then
        echo -n "\"type\": \"folder\"," >> "$output_file"
        echo -n "\"path\": \"$entry\"," >> "$output_file"
    else
        echo -n "\"type\": \"file\"," >> "$output_file"
        echo -n "\"path\": \"$entry\"" >> "$output_file"
    fi

    echo -n "}" >> "$output_file"
done < <(find . -maxdepth 1 -mindepth 1 -print0)

echo -n "]" >> "$output_file"
echo -n "}" >> "$output_file"