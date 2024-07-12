
echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@165.232.79.59:/var/www/html/

echo "Done!"