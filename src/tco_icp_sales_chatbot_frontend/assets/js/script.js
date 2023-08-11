$( document ).ready(function() {
    function render(props) {
        return function(tok, i) { return (i % 2) ? props[tok] : tok; };
    }

    // var _h3 = jQuery('h3');
    var heart_path = 'div.card-footer .product-heart';
    var chat_path = jQuery('#wrapper-chat2');
    var chat_close = jQuery('#chat2-close');
    
    
    var search = jQuery('#search');
    var search_timer = 0;
    async function product_search (){ 
        var title = search.val();
        if (title == ""){
            render_products();
            return false; 
        } 

        jQuery('#wrapper_products div.row div.d-flex').remove()
        var products = await filter_products(title);
        jQuery.each(products, function(i, item) {
            render_product(item)
        })
    }
    search.on('keyup', function(e){
        if (search_timer) clearTimeout(search_timer);
        search_timer = setTimeout(product_search, 400); 
    });

    // ------------------------------------------------------------------------
    // Products
    // ------------------------------------------------------------------------
    var tpl_product = jQuery('#tpl_product');
    var wrapper_products = jQuery('#wrapper_products .row');

    async function filter_products(title){
        return document.serviceFilterProducts(title);
    }

    function get_products(){
        return document.serviceGetProducts();
    }
    function render_product(item){
        var itemTpl = tpl_product.text().split(/\$\{(.+?)\}/g);
        var product = itemTpl.map(render(item)).join('');
        wrapper_products.append(product);        
    }
    async function render_products(){
        var products = await get_products();
        jQuery.each(products, function(i, item) {
            render_product(item)
        })
    }

    // ------------------------------------------------------------------------
    // Blogs
    // ------------------------------------------------------------------------
    var tpl_blog = jQuery('#tpl_blog');
    var wrapper_blogs = jQuery('#wrapper_blogs .row');

    function get_blogs(){
        return document.serviceGetBlogs();
    }
    function render_blog(item){
        var itemTpl = tpl_blog.text().split(/\$\{(.+?)\}/g);
        var blog = itemTpl.map(render(item)).join('');
        wrapper_blogs.append(blog);        
    }
    async function render_blogs(){
        var blogs = await get_blogs();
        jQuery.each(blogs, function(i, item) {
            render_blog(item)
        })
    }
    
    // ------------------------------------------------------------------------
    jQuery("body").on("click", 'div.card-footer .product-heart', function(){
        var _this = jQuery(this);
        jQuery('i.fa-heart',_this).toggleClass('selected');
        chat_path.toggle();
    })

    chat_path.on('click', function(){
        var _this = jQuery(this);
        _this.hide();
    });

    // ------------------------------------------------------------------------
    console.log('Ready: src/tco_icp_sales_chatbot_frontend/assets/js/script.js');
    render_products();
    render_blogs();
});