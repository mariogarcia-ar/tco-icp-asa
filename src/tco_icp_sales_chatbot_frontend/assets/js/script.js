$( document ).ready(function() {
    function render(props) {
        return function(tok, i) { return (i % 2) ? props[tok] : tok; };
    }

    // var _h3 = jQuery('h3');
    var heart_path = 'div.card-footer .product-heart';
    var chat_path = jQuery('#wrapper-chat2');
    var chat_close = jQuery('#chat2-close');
    

    // ------------------------------------------------------------------------
    // Products
    // ------------------------------------------------------------------------
    var tpl_product = jQuery('#tpl_product');
    var wrapper_products = jQuery('#wrapper_products .row');

    function get_products(){
        return $.get('/data/db.json').then(function(resp){
            return resp.products;
        });
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
        return $.get('/data/db.json').then(function(resp){
            return resp.blogs;
        });
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
    render_products();
    render_blogs();
});