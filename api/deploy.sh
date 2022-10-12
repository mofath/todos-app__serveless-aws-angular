
#!/bin/sh
set -e

export SLS_DEBUG=*

echo "Deploying $1 stage"

cd services
for f in *; do
    if [ -d ${f} ]; then
        echo "Deploy $f service"
        cd $f

        echo "Install dependencies"
        npm install
        [ -d ./layers ] && rm -rf ./layers
        mkdir ./layers
        cp -R node_modules ./layers

        serverless deploy --stage $1
        cd ..
    fi
done

