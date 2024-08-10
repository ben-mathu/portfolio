#!/usr/bin/env bash

# Create a directory if it does not exist
icons_dir=src/assets/icons
mkdir $icons_dir/data

icons_json=${icons_dir}/data/svg_files.json

echo -n '{ "svg_files": [ ' > $icons_json

file_count=$(ls $icons_dir | grep -e '|*.svg' | wc -l)

count=0
for entry in $(ls $icons_dir | grep -e '|*.svg')
do

  if [[ $count -eq $(($file_count-1)) ]]
  then
    echo -n '"'${entry%%.*}'" ' >> $icons_json
  else
    echo -n '"'${entry%%.*}'", ' >> $icons_json
  fi
  count=$(($count+1))
done

echo -n '] }' >> $icons_json
