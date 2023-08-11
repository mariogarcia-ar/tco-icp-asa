# TCO ICP Sales Chatbot

## Install 
```bash
git clone git@github.com:mariogarcia-ar/tco-icp-sales-chatbot.git
cd tco-icp-sales-chatbot

# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install v18.17.0 
nvm use v18.17.0 

# install packages
npm install 
```
## Backend

```bash
dfx start --background
```


## Frontend

```bash
dfx deploy 
```

## Candidate Interface
```bash
npm run generate
```


# Blogs

## Create Blog

```bash
dfx canister call tco_icp_sales_chatbot_backend createBlog '(
    "1", 
    record {
        title = "How to promote brands";
        image = "/img/blogs/1.webp";
        excerpt = "When you enter into any new area of science, you almost reach";
        date = "23.12.2022";
    }
)'
```

# Read Blog by Id

```bash
dfx canister call tco_icp_sales_chatbot_backend showBlog '("blog4")'
```

# Read All Blogs

```bash
dfx canister call tco_icp_sales_chatbot_backend getBlogs '()'
```

# Update Blog

Success

```bash
dfx canister call tco_icp_sales_chatbot_backend updateBlog '(
    "1", 
    record {
        title = "How to promote brands updated";
        image = "/img/blogs/1.webp";
        excerpt = "When you enter into any new area of science, you almost reach";
        date = "23.12.2022";
    }
)'
```


Blog not found.

```bash
dfx canister call tco_icp_sales_chatbot_backend updateBlog '(
    "100", 
    record {
        title = "How to promote brands updated";
        image = "/img/blogs/1.webp";
        excerpt = "When you enter into any new area of science, you almost reach";
        date = "23.12.2022";
    }
)'
```

# Remove Blog by Id

```bash
dfx canister call tco_icp_sales_chatbot_backend destroyBlog '("1")'
```

