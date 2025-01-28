#!/bin/sh

echo "Building database container..."
yarn docker:db

echo "Building server container..."
yarn docker:server

echo "Building redis container..."
yarn docker:redis