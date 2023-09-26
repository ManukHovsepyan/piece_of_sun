#!/bin/bash

set -e

cd /usr/share/nginx/waveum-ui
rm -rf /usr/share/nginx/waveum-ui/*
unzip /tmp/codedeploy-deployment-staging-area/waveumui.zip -d /usr/share/nginx/waveum-ui
chown -R ec2-user:ec2-user /usr/share/nginx/waveum-ui
ln -s /usr/share/nginx/dist /usr/share/nginx/waveum-ui/dist
ln -s /usr/share/nginx/robots/robots_waveum.txt /usr/share/nginx/waveum-ui/robots.txt
ln -s /usr/share/nginx/robots/robots_block.txt /usr/share/nginx/waveum-ui/robots_block.txt
mkdir -p /usr/share/nginx/waveum-ui/fr
ln -sf /usr/share/nginx/sitemaps/sitemap_waveum.xml /usr/share/nginx/waveum-ui/sitemap_index.xml