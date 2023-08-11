import Text "mo:base/Text";
// import List "mo:base/List";
import Float "mo:base/Float";
import TrieMap "mo:base/TrieMap";
// import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
  // public type Owner = Principal;
  public type Key = Text;

  // --------------------------------------------------------------------------
  // Blog
  // --------------------------------------------------------------------------
  public type Blog ={
    title: Text;
    image: Text;
    excerpt: Text;
    date: Text;
  };
  
  stable var blogsBackup: [(Key, Blog)] = [];
  var blogs = TrieMap.fromEntries<Key, Blog>(blogsBackup.vals(), Text.equal, Text.hash);

  
  // --------------------------------------------------------------------------
  // Blog CRUD
  // --------------------------------------------------------------------------
  // LIST
  public query func getBlogs(): async [(Key, Blog)]{
    return Iter.toArray(blogs.entries());
  };

  public query func filterBlogs(filter: Text) : async [(Key, Blog)] {
    Iter.toArray(
        TrieMap.mapFilter<Key, Blog, Blog>(
          blogs, Text.equal, Text.hash, func(k, v) {
            if (Text.contains(v.title, #text filter)) {
                ?v
            } else {
                null
            }
          }
        ).entries()
      );
  };

  // CREATE
  public func createBlog(key: Text, blog: Blog): async Blog{
    blogs.put(key, blog);
    return blog;
  };

  // READ
  public query func showBlog(key: Text): async ?Blog{
    return blogs.get(key);
  };

  // UPDATE
  public func updateBlog(key: Text, blog: Blog): async Text{
    switch(blogs.get(key)){
      case (null){ return "Error: blog doesn't exists."};
      case (_){ 
        blogs.put(key, blog);
        return "The blog has been updated."
      };
    }
  };

  // DELETE
  public func destroyBlog(key: Text): async (){
    blogs.delete(key);
  };
  
  // --------------------------------------------------------------------------
  // Product
  // --------------------------------------------------------------------------
  public type Product ={
    title: Text;
    image: Text;
    price: Float;
  };
  
  stable var productsBackup: [(Key, Product)] = [];
  var products = TrieMap.fromEntries<Key, Product>(productsBackup.vals(), Text.equal, Text.hash);

  
  // --------------------------------------------------------------------------
  // Product CRUD
  // --------------------------------------------------------------------------
  // LIST
  public query func getProducts(): async [(Key, Product)]{
    return Iter.toArray(products.entries());
  };

  public query func filterProducts(filter: Text) : async [(Key, Product)] {
    Iter.toArray(
        TrieMap.mapFilter<Key, Product, Product>(
          products, Text.equal, Text.hash, func(k, v) {
            if (Text.contains(v.title, #text filter)) {
                ?v
            } else {
                null
            }
          }
        ).entries()
      );
  };

  // CREATE
  public func createProduct(key: Text, product: Product): async Product{
    products.put(key, product);
    return product;
  };

  // READ
  public query func showProduct(key: Text): async ?Product{
    return products.get(key);
  };

  // UPDATE
  public func updateProduct(key: Text, product: Product): async Text{
    switch(products.get(key)){
      case (null){ return "Error: product doesn't exists."};
      case (_){ 
        products.put(key, product);
        return "The product has been updated."
      };
    }
  };

  // DELETE
  public func destroyProduct(key: Text): async (){
    products.delete(key);
  };

  // --------------------------------------------------------------------------
  // System
  // --------------------------------------------------------------------------
  system func preupgrade(){
    blogsBackup := Iter.toArray(blogs.entries());
    productsBackup := Iter.toArray(products.entries());
  };

  system func postupgrade(){
      blogsBackup := [];
      productsBackup := [];
  }

};
