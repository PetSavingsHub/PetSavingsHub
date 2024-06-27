import { product } from "@/constants/commonTypes";
import { parse } from "node-html-parser";

export function parseHTML(html: string) {
  const products: product[] = [];
  const root = parse(html);
  const maxPage =
    root.querySelector(".page-last")?.textContent ||
    root.querySelector(".current-page")?.textContent ||
    "";
  const itemsATags = root.querySelectorAll(".name-link");
  itemsATags.forEach((item) => {
    const name = item.getAttribute("title");
    const href = item.getAttribute("href");
    const product: product = {
      name: (name || "").replace("&trade;", "™"),
      href: href || "",
      img: "",
      regularPrice: "",
    };

    const productTile = item.querySelector(".product-tile");
    if (productTile) {
      const productImageWrapper = productTile.querySelector(
        ".product-image-wrapper"
      );
      if (productImageWrapper) {
        const imgNode = productImageWrapper.querySelector("img");
        if (imgNode) {
          const img = imgNode.getAttribute("src");
          if (!img) return;

          product.img = img;
        } else {
          console.log("No image node");
        }
      } else {
        console.log("No productImageWrapper");
        return;
      }

      const productPricing = productTile.querySelector(".product-pricing");
      if (productPricing) {
        const priceRagular = productPricing.querySelector(".price-regular");
        const priceStandard = productPricing.querySelector(".price-standard");
        if (priceRagular || priceStandard) {
          const regularPriceText =
            priceRagular?.textContent || priceStandard?.textContent;
          if (!regularPriceText) return;
          product.regularPrice = priceParser(regularPriceText);
        } else {
          console.log("No regular price");
          return;
        }

        const priceSales = productPricing.querySelector(".price-sales");
        if (priceSales) {
          const salesPriceText = priceSales.textContent;
          if (!salesPriceText) return;
          product.salesPrice = priceParser(salesPriceText);
        } else {
          // console.log("No sales price");
        }
      } else {
        console.log("No productPricing");
        return;
      }

      const productPromo = productTile.querySelector(".product-promo");
      if (productPromo) {
        const promotionalMessages = productPromo.querySelectorAll(
          ".promotional-message"
        );
        if (promotionalMessages.length > 0) {
          product.promotionalMessages = [];
          promotionalMessages.forEach((promotionalMessage) => {
            const message = promotionalMessage.querySelector("p")?.textContent;
            if (message) {
              product.promotionalMessages?.push(message);
            }
          });
        }
      } else {
        console.log("No productPromo");
      }

      products.push(product);
    } else {
      console.log("No productTile");
      return;
    }
  });

  return { products, maxPage };
}

function priceParser(rawPrice: string) {
  return rawPrice
    .replace("Old Price\n", "")
    .replace("Discounted Price\n", "")
    .replaceAll("$", "")
    .replaceAll("\n", "")
    .trim();
}

const test = `
<meta id="'ps:blip:S06'" class="gtmPageName">
<div class="brandproducthits-grid">
<div id="tabs" class=" brand-search-content-wrapper">
<div class="tabs-nav-wrapper">
<ul class="tabs-nav">
</ul>
</div>
<div class="content-wrapper-search container">
<div id="tabs-1" class="products">
<div class="filter-menu-bar">
<div class="filters-menu-bar-show-filters">
<a id="open-modal-filters" data-lid="Filter" data-lpos="Header:Filter" data-link-type="o" href="javascript:void(0);">
<em class="icon icon-show-filters"></em>
Filter
</a>
<div class="filter-sort-by">
<div class="sort-by">
<div id="grid-sort-footer" class="custom-dropdown-sort-by" tabindex="0">
<span class="inactive">sort by</span>
<span class="sorting-rule">Best Sellers</span>
<em class="icon icon-arrow-down"></em>
<ul class="dropdown">
<li class data-prefn="srule=null&start=null&sz=null">
<a data-js-sort-by data-gtm="Relevance" data-lid="Relevance" data-lpos="product-list" data-eventname="Sort By Option" data-eventaction="sort by Relevance" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=relevance&amp;start=0&amp;sz=5">
Relevance
</a>
</li>
<li class data-prefn="srule=null&start=null&sz=null">
<a data-js-sort-by data-gtm="Price: High to Low" data-lid="Price: High to Low" data-lpos="product-list" data-eventname="Sort By Option" data-eventaction="sort by Price: High to Low" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=price-high-to-low&amp;start=0&amp;sz=5">
Price: High to Low
</a>
</li>
<li class data-prefn="srule=null&start=null&sz=null">
<a data-js-sort-by data-gtm="Price: Low to High" data-lid="Price: Low to High" data-lpos="product-list" data-eventname="Sort By Option" data-eventaction="sort by Price: Low to High" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=price-low-to-high&amp;start=0&amp;sz=5">
Price: Low to High
</a>
</li>
<li class="selected" data-prefn="srule=null&start=null&sz=null">
<a data-js-sort-by data-gtm="Best Sellers" data-lid="Best Sellers" data-lpos="product-list" data-eventname="Sort By Option" data-eventaction="sort by Best Sellers" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=0&amp;sz=5">
Best Sellers
</a>
</li>
<li class data-prefn="srule=null&start=null&sz=null">
<a data-js-sort-by data-gtm="New Arrivals" data-lid="New Arrivals" data-lpos="product-list" data-eventname="Sort By Option" data-eventaction="sort by New Arrivals" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=new-arrival&amp;start=0&amp;sz=5">
New Arrivals
</a>
</li>
<li class data-prefn="srule=null&start=null&sz=null">
<a data-js-sort-by data-gtm="Top Rated" data-lid="Top Rated" data-lpos="product-list" data-eventname="Sort By Option" data-eventaction="sort by Top Rated" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=top-rated&amp;start=0&amp;sz=5">
Top Rated
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
<div class="product-browse-grid-wrapper">
<div id="primary" class="primary-content col-lg-9">
<div class="search-result-content">
<div class="row pagination-container">
<div class="col-lg-6 col-md-6 col-sm-12 pagination-items-per-page-container">
<div class="items-per-page ">
<form action="/sale/june/" method="post" name="Product-Paging-Options">
<fieldset>
<label for="grid-paging-header" class="items-per-page-text">items per page:</label>
<ul class="items-per-page-options">
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=24">24</li>
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=36">36</li>
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=48">48</li>
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=60">60</li>
</ul>
</fieldset>
</form>
</div>
</div>
<div class="col-lg-6 col-md-6 col-sm-12 pagination-routing-container">
<div class="pagination">
<ul>
<li class="current-page" title="Currently on page: 1">
1
</li>
<li>
<a class="anchorpagination page-2" title="Go to page number: 2" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=5&amp;sz=5">2</a>
</li>
<li>
<a class="anchorpagination page-3" title="Go to page number: 3" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=10&amp;sz=5">3</a>
</li>
<li class="page-dots">
<span class="anchorpagination">...</span>
</li>
<li class="last-text">
<a class="page-last anchorpagination" title="Go to last page" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=1640&amp;sz=5">329</a>
</li>
<li class="next-arrow">
<a class="page-next" title="Go to next page" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=5&amp;sz=5"><em class="icon-arrow-right"></em></a>
</li>
</ul>
</div>
</div>
</div>
<ul id="search-result-items" class="search-result-items tiles-container clearfix hide-compare ajax">
<li class="grid-tile gtm-grid-tile col-md-4 col-sm-12" data-colors-to-show>

<script type="text/javascript">//<!--
/* <![CDATA[ */
(function(){
try {
    if(window.CQuotient) {
	var cq_params = {};
	
	cq_params.cookieId = window.CQuotient.getCQCookieId();
	cq_params.userId = window.CQuotient.getCQUserId();
	cq_params.emailId = CQuotient.getCQHashedEmail();
	cq_params.loginId = CQuotient.getCQHashedLogin();
	cq_params.accumulate = true;
	cq_params.products = [{
	    id: '54084',
	    sku: ''
	}];
	cq_params.categoryId = 'S06';
	cq_params.refinements = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
	cq_params.personalized = 'false';
	cq_params.sortingRule = 'best-sellers';
	cq_params.imageUUID = '__UNDEFINED__';
	cq_params.realm = "ABBB";
	cq_params.siteId = "PetSmart_CA";
	cq_params.instanceType = "prd";
	cq_params.queryLocale = "en_CA";
	cq_params.locale = window.CQuotient.locale;
	
	if(window.CQuotient.sendActivity)
	    window.CQuotient.sendActivity(CQuotient.clientId, 'viewCategory', cq_params);
	else
	    window.CQuotient.activities.push({
	    	activityType: 'viewCategory',
	    	parameters: cq_params
	    });
  }
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewCategoryProduct-active_data.js) */
(function(){
try {
	if (dw.ac) {
		var search_params = {};
		search_params.persd = 'false';
		search_params.refs = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
		search_params.sort = 'best-sellers';
		search_params.imageUUID = '';
		search_params.searchID = 'f028bc1f-ca2c-4897-b6fc-0df00b0754db';
		search_params.locale = 'en_CA';
		search_params.queryLocale = 'en_CA';
		search_params.showProducts = 'true';
		dw.ac.applyContext({category: "S06", searchData: search_params});
		if (typeof dw.ac._scheduleDataSubmission === "function") {
			dw.ac._scheduleDataSubmission();
		}
	}
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewProduct-active_data.js) */
dw.ac._capture({id: "54084", type: "searchhit"});
/* ]]> */
// -->
</script>
<a class="name-link" data-lid="Blue Buffalo&reg; Tastefuls&amp;trade; Sensitive Stomach Adult Dry Cat Food, Natural , Chicken &amp; Brown Rice" data-lpos="product-list" data-link-type="o" data-master="product-click" href="/sale/june/blue-buffalo-tastefulsandtrade-sensitive-stomach-adult-dry-cat-food-natural-chicken-and-brown-rice-54084.html?cgid=S06&amp;fmethod=Browse" title="Blue Buffalo&reg; Tastefuls&amp;trade; Sensitive Stomach Adult Dry Cat Food, Natural , Chicken &amp; Brown Rice">
<div class="product-tile" id="049f2fa62f98f6c6d1a2656a8a" data-itemid="54084" data-gtm-product-click="{&quot;name&quot;:&quot;Blue Buffalo&reg; Tastefuls&amp;trade; Sensitive Stomach Adult Dry Cat Food, Natural , Chicken &amp; Brown Rice&quot;,&quot;id&quot;:&quot;5291422&quot;,&quot;brand&quot;:&quot;Blue Buffalo&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}" data-gtm-product-impression="{&quot;name&quot;:&quot;Blue Buffalo&reg; Tastefuls&amp;trade; Sensitive Stomach Adult Dry Cat Food, Natural , Chicken &amp; Brown Rice&quot;,&quot;id&quot;:&quot;5291422&quot;,&quot;brand&quot;:&quot;Blue Buffalo&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}">

<div class="product-image-wrapper">
<div class="product-image">


<img itemprop="image" src="https://s7d2.scene7.com/is/image/PetSmart/5291422?$sclp-prd-main_large$" alt srcset="https://s7d2.scene7.com/is/image/PetSmart/5291422?$sclp-prd-main_small$ 150w,https://s7d2.scene7.com/is/image/PetSmart/5291422?$sclp-prd-main_large$ 228w" sizes="(max-width: 1023px) 136px, 228px" />
</div>
<meta property="og:image" content="https://s7d2.scene7.com/is/image/PetSmart/5291422?$sclp-prd-main_large$" />
<meta name="twitter:image" content="https://s7d2.scene7.com/is/image/PetSmart/5291422?$sclp-prd-main_large$" />

<div class="product-tile-flavours">
<div class="product-flavour-text">
2
Sizes
</div>
</div>
</div>

<div>
<div class="product-tile-badge">
</div>
<div class="product-name">
<h3>Blue Buffalo<sup>®</sup> Tastefuls<sup>&trade;</sup> Sensitive Stomach Adult Dry Cat Food, Natural , Chicken & Brown Rice</h3>
</div>
<div class="product-wrapper-data">
<div class="product-pricing">



<span itemprop="priceCurrency"><input type="hidden" name="priceCurrencyVal" value="CAD"></span>
<div class="product-price">
<span class="price-regular" data-gtm-price="34.99"><span class="sr-only">Old Price</span>
$ 34.99
-
65.99
</span>
</div>
</div>
<input type="hidden" class="bv-enabled" value="true" />
<div class="BVInlineRatings">
<div class="stars-container">
<div class="unrated-stars-container">
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
</div>
<div class="rated-stars-container">
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-7-tenth"></span>
</div>
<div class="bv-review-count">(290)</div>
</div>
</div>
</div>
<div class="product-promo">
<div data-campaign-rank="10" class="promotional-message promo-order-level">
<p>Spend $40, Save $10 on all Blue Buffalo Tastefuls Cat Food</p>
</div>
<div data-campaign-rank="10" class="promotional-message promo-product-level">
<p>Sign in & save an extra 20% with code SAVE20. Exclusions apply. See terms.</p>
</div>
</div>
</div>
</div>
</a>
</li>
<li class="grid-tile gtm-grid-tile col-md-4 col-sm-12" data-colors-to-show>

<script type="text/javascript">//<!--
/* <![CDATA[ */
(function(){
try {
    if(window.CQuotient) {
	var cq_params = {};
	
	cq_params.cookieId = window.CQuotient.getCQCookieId();
	cq_params.userId = window.CQuotient.getCQUserId();
	cq_params.emailId = CQuotient.getCQHashedEmail();
	cq_params.loginId = CQuotient.getCQHashedLogin();
	cq_params.accumulate = true;
	cq_params.products = [{
	    id: '30704',
	    sku: ''
	}];
	cq_params.categoryId = 'S06';
	cq_params.refinements = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
	cq_params.personalized = 'false';
	cq_params.sortingRule = 'best-sellers';
	cq_params.imageUUID = '__UNDEFINED__';
	cq_params.realm = "ABBB";
	cq_params.siteId = "PetSmart_CA";
	cq_params.instanceType = "prd";
	cq_params.queryLocale = "en_CA";
	cq_params.locale = window.CQuotient.locale;
	
	if(window.CQuotient.sendActivity)
	    window.CQuotient.sendActivity(CQuotient.clientId, 'viewCategory', cq_params);
	else
	    window.CQuotient.activities.push({
	    	activityType: 'viewCategory',
	    	parameters: cq_params
	    });
  }
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewCategoryProduct-active_data.js) */
(function(){
try {
	if (dw.ac) {
		var search_params = {};
		search_params.persd = 'false';
		search_params.refs = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
		search_params.sort = 'best-sellers';
		search_params.imageUUID = '';
		search_params.searchID = 'f028bc1f-ca2c-4897-b6fc-0df00b0754db';
		search_params.locale = 'en_CA';
		search_params.queryLocale = 'en_CA';
		search_params.showProducts = 'true';
		dw.ac.applyContext({category: "S06", searchData: search_params});
		if (typeof dw.ac._scheduleDataSubmission === "function") {
			dw.ac._scheduleDataSubmission();
		}
	}
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewProduct-active_data.js) */
dw.ac._capture({id: "30704", type: "searchhit"});
/* ]]> */
// -->
</script>
<a class="name-link" data-lid="Hill's&reg; Science Diet&reg; Urinary Hairball Control Adult Dry Cat Food - Chicken" data-lpos="product-list" data-link-type="o" data-master="product-click" href="/sale/june/hills-science-diet-urinary-hairball-control-adult-dry-cat-food---chicken-30704.html?cgid=S06&amp;fmethod=Browse" title="Hill's&reg; Science Diet&reg; Urinary Hairball Control Adult Dry Cat Food - Chicken">
<div class="product-tile" id="216c2772eedeb17f55df59ff88" data-itemid="30704" data-gtm-product-click="{&quot;name&quot;:&quot;Hill's&reg; Science Diet&reg; Urinary Hairball Control Adult Dry Cat Food - Chicken&quot;,&quot;id&quot;:&quot;5237395&quot;,&quot;brand&quot;:&quot;Hill's Science Diet&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}" data-gtm-product-impression="{&quot;name&quot;:&quot;Hill's&reg; Science Diet&reg; Urinary Hairball Control Adult Dry Cat Food - Chicken&quot;,&quot;id&quot;:&quot;5237395&quot;,&quot;brand&quot;:&quot;Hill's Science Diet&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}">

<div class="product-image-wrapper">
<div class="product-image">


<img itemprop="image" src="https://s7d2.scene7.com/is/image/PetSmart/5237395?$sclp-prd-main_large$" alt srcset="https://s7d2.scene7.com/is/image/PetSmart/5237395?$sclp-prd-main_small$ 150w,https://s7d2.scene7.com/is/image/PetSmart/5237395?$sclp-prd-main_large$ 228w" sizes="(max-width: 1023px) 136px, 228px" />
</div>
<meta property="og:image" content="https://s7d2.scene7.com/is/image/PetSmart/5237395?$sclp-prd-main_large$" />
<meta name="twitter:image" content="https://s7d2.scene7.com/is/image/PetSmart/5237395?$sclp-prd-main_large$" />

<div class="product-tile-flavours">
<div class="product-flavour-text">
3
Sizes
</div>
</div>
</div>

<div>
<div class="product-tile-badge">
</div>
<div class="product-name">
<h3>Hill's<sup>®</sup> Science Diet<sup>®</sup> Urinary Hairball Control Adult Dry Cat Food - Chicken</h3>
</div>
<div class="product-wrapper-data">
<div class="product-pricing">



<span itemprop="priceCurrency"><input type="hidden" name="priceCurrencyVal" value="CAD"></span>
<div class="product-price">
<span class="price-sales" data-gtm-price="96.99"><span class="sr-only">Discounted Price</span>
$ 41.99
-
96.99
</span>
<span class="price-standard price-standard-range"><span class="sr-only">Old Price</span>
$ 41.99
-
106.99
</span>
</div>
</div>
<input type="hidden" class="bv-enabled" value="true" />
<div class="BVInlineRatings">
<div class="stars-container">
<div class="unrated-stars-container">
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
</div>
<div class="rated-stars-container">
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-6-tenth"></span>
</div>
<div class="bv-review-count">(355)</div>
</div>
</div>
</div>
<div class="product-promo">
<div data-campaign-rank="10" class="promotional-message promo-product-level">
<p>Sign in & save an extra 20% with code SAVE20. Exclusions apply. See terms.</p>
</div>
<div data-campaign-rank="10" class="promotional-message promo-order-level">
<p>Save $10 now & Get $10 off later on select Hill's Science Diet Dog & Cat Food. See terms.</p>
</div>
</div>
</div>
</div>
</a>
</li>
<li class="grid-tile gtm-grid-tile col-md-4 col-sm-12" data-colors-to-show>

<script type="text/javascript">//<!--
/* <![CDATA[ */
(function(){
try {
    if(window.CQuotient) {
	var cq_params = {};
	
	cq_params.cookieId = window.CQuotient.getCQCookieId();
	cq_params.userId = window.CQuotient.getCQUserId();
	cq_params.emailId = CQuotient.getCQHashedEmail();
	cq_params.loginId = CQuotient.getCQHashedLogin();
	cq_params.accumulate = true;
	cq_params.products = [{
	    id: '570',
	    sku: ''
	}];
	cq_params.categoryId = 'S06';
	cq_params.refinements = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
	cq_params.personalized = 'false';
	cq_params.sortingRule = 'best-sellers';
	cq_params.imageUUID = '__UNDEFINED__';
	cq_params.realm = "ABBB";
	cq_params.siteId = "PetSmart_CA";
	cq_params.instanceType = "prd";
	cq_params.queryLocale = "en_CA";
	cq_params.locale = window.CQuotient.locale;
	
	if(window.CQuotient.sendActivity)
	    window.CQuotient.sendActivity(CQuotient.clientId, 'viewCategory', cq_params);
	else
	    window.CQuotient.activities.push({
	    	activityType: 'viewCategory',
	    	parameters: cq_params
	    });
  }
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewCategoryProduct-active_data.js) */
(function(){
try {
	if (dw.ac) {
		var search_params = {};
		search_params.persd = 'false';
		search_params.refs = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
		search_params.sort = 'best-sellers';
		search_params.imageUUID = '';
		search_params.searchID = 'f028bc1f-ca2c-4897-b6fc-0df00b0754db';
		search_params.locale = 'en_CA';
		search_params.queryLocale = 'en_CA';
		search_params.showProducts = 'true';
		dw.ac.applyContext({category: "S06", searchData: search_params});
		if (typeof dw.ac._scheduleDataSubmission === "function") {
			dw.ac._scheduleDataSubmission();
		}
	}
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewProduct-active_data.js) */
dw.ac._capture({id: "570", type: "searchhit"});
/* ]]> */
// -->
</script>
<a class="name-link" data-lid="Hill's&reg; Science Diet&reg; Sensitive Stomach &amp; Skin Adult Dry Dog Food - Chicken &amp; Barley" data-lpos="product-list" data-link-type="o" data-master="product-click" href="/sale/june/hills-science-diet-sensitive-stomach-and-skin-adult-dry-dog-food---chicken-and-barley-570.html?cgid=S06&amp;fmethod=Browse" title="Hill's&reg; Science Diet&reg; Sensitive Stomach &amp; Skin Adult Dry Dog Food - Chicken &amp; Barley">
<div class="product-tile" id="2992985a291e14d37395cb46ba" data-itemid="570" data-gtm-product-click="{&quot;name&quot;:&quot;Hill's&reg; Science Diet&reg; Sensitive Stomach &amp; Skin Adult Dry Dog Food - Chicken &amp; Barley&quot;,&quot;id&quot;:&quot;5154856&quot;,&quot;brand&quot;:&quot;Hill's Science Diet&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}" data-gtm-product-impression="{&quot;name&quot;:&quot;Hill's&reg; Science Diet&reg; Sensitive Stomach &amp; Skin Adult Dry Dog Food - Chicken &amp; Barley&quot;,&quot;id&quot;:&quot;5154856&quot;,&quot;brand&quot;:&quot;Hill's Science Diet&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}">

<div class="product-image-wrapper">
<div class="product-image">


<img itemprop="image" src="https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$" alt srcset="https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_small$ 150w,https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$ 228w" sizes="(max-width: 1023px) 136px, 228px" />
</div>
<meta property="og:image" content="https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$" />
<meta name="twitter:image" content="https://s7d2.scene7.com/is/image/PetSmart/5154856?$sclp-prd-main_large$" />

<div class="product-tile-flavours">
<div class="product-flavour-text">
3
Sizes
</div>
</div>
</div>

<div>
<div class="product-tile-badge">
</div>
<div class="product-name">
<h3>Hill's<sup>®</sup> Science Diet<sup>®</sup> Sensitive Stomach & Skin Adult Dry Dog Food - Chicken & Barley</h3>
</div>
<div class="product-wrapper-data">
<div class="product-pricing">



<span itemprop="priceCurrency"><input type="hidden" name="priceCurrencyVal" value="CAD"></span>
<div class="product-price">
<span class="price-sales" data-gtm-price="105.99"><span class="sr-only">Discounted Price</span>
$ 38.99
-
105.99
</span>
<span class="price-standard price-standard-range"><span class="sr-only">Old Price</span>
$ 38.99
-
115.99
</span>
</div>
</div>
<input type="hidden" class="bv-enabled" value="true" />
<div class="BVInlineRatings">
<div class="stars-container">
<div class="unrated-stars-container">
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
</div>
<div class="rated-stars-container">
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-6-tenth"></span>
</div>
<div class="bv-review-count">(625)</div>
</div>
</div>
</div>
<div class="product-promo">
<div data-campaign-rank="10" class="promotional-message promo-product-level">
<p>Sign in & save an extra 20% with code SAVE20. Exclusions apply. See terms.</p>
</div>
<div data-campaign-rank="10" class="promotional-message promo-order-level">
<p>Save $10 now & Get $10 off later on select Hill's Science Diet Dog & Cat Food. See terms.</p>
</div>
</div>
</div>
</div>
</a>
</li>
<li class="grid-tile gtm-grid-tile col-md-4 col-sm-12" data-colors-to-show>

<script type="text/javascript">//<!--
/* <![CDATA[ */
(function(){
try {
    if(window.CQuotient) {
	var cq_params = {};
	
	cq_params.cookieId = window.CQuotient.getCQCookieId();
	cq_params.userId = window.CQuotient.getCQUserId();
	cq_params.emailId = CQuotient.getCQHashedEmail();
	cq_params.loginId = CQuotient.getCQHashedLogin();
	cq_params.accumulate = true;
	cq_params.products = [{
	    id: '83544',
	    sku: ''
	}];
	cq_params.categoryId = 'S06';
	cq_params.refinements = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
	cq_params.personalized = 'false';
	cq_params.sortingRule = 'best-sellers';
	cq_params.imageUUID = '__UNDEFINED__';
	cq_params.realm = "ABBB";
	cq_params.siteId = "PetSmart_CA";
	cq_params.instanceType = "prd";
	cq_params.queryLocale = "en_CA";
	cq_params.locale = window.CQuotient.locale;
	
	if(window.CQuotient.sendActivity)
	    window.CQuotient.sendActivity(CQuotient.clientId, 'viewCategory', cq_params);
	else
	    window.CQuotient.activities.push({
	    	activityType: 'viewCategory',
	    	parameters: cq_params
	    });
  }
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewCategoryProduct-active_data.js) */
(function(){
try {
	if (dw.ac) {
		var search_params = {};
		search_params.persd = 'false';
		search_params.refs = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
		search_params.sort = 'best-sellers';
		search_params.imageUUID = '';
		search_params.searchID = 'f028bc1f-ca2c-4897-b6fc-0df00b0754db';
		search_params.locale = 'en_CA';
		search_params.queryLocale = 'en_CA';
		search_params.showProducts = 'true';
		dw.ac.applyContext({category: "S06", searchData: search_params});
		if (typeof dw.ac._scheduleDataSubmission === "function") {
			dw.ac._scheduleDataSubmission();
		}
	}
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewProduct-active_data.js) */
dw.ac._capture({id: "83544", type: "searchhit"});
/* ]]> */
// -->
</script>
<a class="name-link" data-lid="Nutrience SubZero Adult Cat Food - Limited Ingredient, Turkey &amp; Pumpkin" data-lpos="product-list" data-link-type="o" data-master="product-click" href="/sale/june/nutrience-subzero-adult-cat-food---limited-ingredient-turkey-and-pumpkin-83544.html?cgid=S06&amp;fmethod=Browse" title="Nutrience SubZero Adult Cat Food - Limited Ingredient, Turkey &amp; Pumpkin">
<div class="product-tile" id="587c0a747bc7c8dd9c6a4de6d5" data-itemid="83544" data-gtm-product-click="{&quot;name&quot;:&quot;Nutrience SubZero Adult Cat Food - Limited Ingredient, Turkey &amp; Pumpkin&quot;,&quot;id&quot;:&quot;5350011&quot;,&quot;brand&quot;:&quot;Nutrience&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}" data-gtm-product-impression="{&quot;name&quot;:&quot;Nutrience SubZero Adult Cat Food - Limited Ingredient, Turkey &amp; Pumpkin&quot;,&quot;id&quot;:&quot;5350011&quot;,&quot;brand&quot;:&quot;Nutrience&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}">

<div class="product-image-wrapper">
<div class="product-image">


<img itemprop="image" src="https://s7d2.scene7.com/is/image/PetSmart/5350011?$sclp-prd-main_large$" alt srcset="https://s7d2.scene7.com/is/image/PetSmart/5350011?$sclp-prd-main_small$ 150w,https://s7d2.scene7.com/is/image/PetSmart/5350011?$sclp-prd-main_large$ 228w" sizes="(max-width: 1023px) 136px, 228px" />
</div>
<meta property="og:image" content="https://s7d2.scene7.com/is/image/PetSmart/5350011?$sclp-prd-main_large$" />
<meta name="twitter:image" content="https://s7d2.scene7.com/is/image/PetSmart/5350011?$sclp-prd-main_large$" />

<div class="product-tile-flavours">
<div class="product-flavour-text">
2
Sizes
</div>
</div>
</div>

<div>
<div class="product-tile-badge">
<div class="text-badge new-badge">New</div>
</div>
<div class="product-name">
<h3>Nutrience SubZero Adult Cat Food - Limited Ingredient, Turkey & Pumpkin</h3>
</div>
<div class="product-wrapper-data">
<div class="product-pricing">



<span itemprop="priceCurrency"><input type="hidden" name="priceCurrencyVal" value="CAD"></span>
<div class="product-price">
<span class="price-sales" data-gtm-price="53.99"><span class="sr-only">Discounted Price</span>
$ 26.99
-
53.99
</span>
<span class="price-standard price-standard-range"><span class="sr-only">Old Price</span>
$ 29.99
-
59.99
</span>
</div>
</div>
<input type="hidden" class="bv-enabled" value="true" />
<div class="BVInlineRatings">
<div class="stars-container">
<div class="unrated-stars-container">
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
</div>
<div class="rated-stars-container">
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
</div>
<div class="bv-review-count">(1)</div>
</div>
</div>
</div>
<div class="product-promo">
<div data-campaign-rank="10" class="promotional-message promo-product-level">
<p>Sign in & save an extra 20% with code SAVE20. Exclusions apply. See terms.</p>
</div>
</div>
</div>
</div>
</a>
</li>
<li class="grid-tile gtm-grid-tile col-md-4 col-sm-12" data-colors-to-show>

<script type="text/javascript">//<!--
/* <![CDATA[ */
(function(){
try {
    if(window.CQuotient) {
	var cq_params = {};
	
	cq_params.cookieId = window.CQuotient.getCQCookieId();
	cq_params.userId = window.CQuotient.getCQUserId();
	cq_params.emailId = CQuotient.getCQHashedEmail();
	cq_params.loginId = CQuotient.getCQHashedLogin();
	cq_params.accumulate = true;
	cq_params.products = [{
	    id: '75839',
	    sku: ''
	}];
	cq_params.categoryId = 'S06';
	cq_params.refinements = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
	cq_params.personalized = 'false';
	cq_params.sortingRule = 'best-sellers';
	cq_params.imageUUID = '__UNDEFINED__';
	cq_params.realm = "ABBB";
	cq_params.siteId = "PetSmart_CA";
	cq_params.instanceType = "prd";
	cq_params.queryLocale = "en_CA";
	cq_params.locale = window.CQuotient.locale;
	
	if(window.CQuotient.sendActivity)
	    window.CQuotient.sendActivity(CQuotient.clientId, 'viewCategory', cq_params);
	else
	    window.CQuotient.activities.push({
	    	activityType: 'viewCategory',
	    	parameters: cq_params
	    });
  }
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewCategoryProduct-active_data.js) */
(function(){
try {
	if (dw.ac) {
		var search_params = {};
		search_params.persd = 'false';
		search_params.refs = '[{\"name\":\"priceMin\",\"value\":\"0.01\"},{\"name\":\"priceMax\",\"value\":\"null\"},{\"name\":\"curr\",\"value\":\"CAD\"},{\"name\":\"Category\",\"value\":\"S06\"}]';
		search_params.sort = 'best-sellers';
		search_params.imageUUID = '';
		search_params.searchID = 'f028bc1f-ca2c-4897-b6fc-0df00b0754db';
		search_params.locale = 'en_CA';
		search_params.queryLocale = 'en_CA';
		search_params.showProducts = 'true';
		dw.ac.applyContext({category: "S06", searchData: search_params});
		if (typeof dw.ac._scheduleDataSubmission === "function") {
			dw.ac._scheduleDataSubmission();
		}
	}
} catch(err) {}
})();
/* ]]> */
// -->
</script>
<script type="text/javascript">//<!--
/* <![CDATA[ (viewProduct-active_data.js) */
dw.ac._capture({id: "75839", type: "searchhit"});
/* ]]> */
// -->
</script>
<a class="name-link" data-lid="SHEBA Bistro Perfect Portions Adult Wet Cat Food Variety 12-Pack - Chicken &amp; Salmon" data-lpos="product-list" data-link-type="o" data-master="product-click" href="/sale/june/sheba-bistro-perfect-portions-adult-wet-cat-food-variety-12-pack---chicken-and-salmon-75839.html?cgid=S06&amp;fmethod=Browse" title="SHEBA Bistro Perfect Portions Adult Wet Cat Food Variety 12-Pack - Chicken &amp; Salmon">
<div class="product-tile" id="a78b65142128d3f263ebbf60dd" data-itemid="75839" data-gtm-product-click="{&quot;name&quot;:&quot;SHEBA Bistro Perfect Portions Adult Wet Cat Food Variety 12-Pack - Chicken &amp; Salmon&quot;,&quot;id&quot;:&quot;5339240&quot;,&quot;brand&quot;:&quot;Sheba&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}" data-gtm-product-impression="{&quot;name&quot;:&quot;SHEBA Bistro Perfect Portions Adult Wet Cat Food Variety 12-Pack - Chicken &amp; Salmon&quot;,&quot;id&quot;:&quot;5339240&quot;,&quot;brand&quot;:&quot;Sheba&quot;,&quot;dimension5&quot;:&quot;Others&quot;,&quot;dimension42&quot;:null,&quot;dimension43&quot;:null,&quot;dimension44&quot;:null,&quot;dimension45&quot;:null,&quot;dimension41&quot;:null}">

<div class="product-image-wrapper">
<div class="product-image">


<img itemprop="image" src="https://s7d2.scene7.com/is/image/PetSmart/5339240?$sclp-prd-main_large$" alt srcset="https://s7d2.scene7.com/is/image/PetSmart/5339240?$sclp-prd-main_small$ 150w,https://s7d2.scene7.com/is/image/PetSmart/5339240?$sclp-prd-main_large$ 228w" sizes="(max-width: 1023px) 136px, 228px" />
</div>
<meta property="og:image" content="https://s7d2.scene7.com/is/image/PetSmart/5339240?$sclp-prd-main_large$" />
<meta name="twitter:image" content="https://s7d2.scene7.com/is/image/PetSmart/5339240?$sclp-prd-main_large$" />

<div class="product-tile-flavours">
</div>
</div>

<div>
<div class="product-tile-badge">
</div>
<div class="product-name">
<h3>SHEBA Bistro Perfect Portions Adult Wet Cat Food Variety 12-Pack - Chicken & Salmon</h3>
</div>
<div class="product-wrapper-data">
<div class="product-pricing">



<span itemprop="priceCurrency"><input type="hidden" name="priceCurrencyVal" value="CAD"></span>
<div class="product-price">
<span class="price-sales" data-gtm-price="17.99"><span class="sr-only">Discounted Price</span>
$ 17.99
</span>

<span class="price-standard price-standard-norange"><span class="sr-only">Old Price</span>
$ 19.99</span>
</div>
</div>
<input type="hidden" class="bv-enabled" value="true" />
<div class="BVInlineRatings">
<div class="stars-container">
<div class="unrated-stars-container">
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
<span class="star-icon star-unrated"></span>
</div>
<div class="rated-stars-container">
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-full-rated"></span>
<span class="star-icon star-7-tenth"></span>
</div>
<div class="bv-review-count">(39)</div>
</div>
</div>
</div>
<div class="product-promo">
<div data-campaign-rank="10" class="promotional-message promo-product-level">
<p>Sign in & save an extra 20% with code SAVE20. Exclusions apply. See terms.</p>
</div>
<div data-campaign-rank="100" class="promotional-message promo-product-level">
<p>Sign in & Save 15% on your first Autoship Order!</p>
</div>
</div>
</div>
</div>
</a>
</li>
</ul>
<div class="row pagination-container">
<div class="col-lg-6 col-md-6 col-sm-12 pagination-items-per-page-container">
<div class="items-per-page ">
<form action="/sale/june/" method="post" name="Product-Paging-Options">
<fieldset>
<label for="grid-paging-header" class="items-per-page-text">items per page:</label>
<ul class="items-per-page-options">
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=24">24</li>
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=36">36</li>
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=48">48</li>
<li value="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;sz=60">60</li>
</ul>
</fieldset>
</form>
</div>
</div>
<div class="col-lg-6 col-md-6 col-sm-12 pagination-routing-container">
<div class="pagination">
<ul>
<li class="current-page" title="Currently on page: 1">
1
</li>
<li>
<a class="anchorpagination page-2" title="Go to page number: 2" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=5&amp;sz=5">2</a>
</li>
<li>
<a class="anchorpagination page-3" title="Go to page number: 3" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=10&amp;sz=5">3</a>
</li>
<li class="page-dots">
<span class="anchorpagination">...</span>
</li>
<li class="last-text">
<a class="page-last anchorpagination" title="Go to last page" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=1640&amp;sz=5">329</a>
</li>
<li class="next-arrow">
<a class="page-next" title="Go to next page" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;start=5&amp;sz=5"><em class="icon-arrow-right"></em></a>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
<div id="secondary" class="refinements col-lg-3 col-md-3">
<div class="refinement-container">
<span class="visually-hidden">Refine Your Results By:</span>
<div class="plp-refinement-breadcrumbs" data-gtm-category="June" data-gtm-categories="{&quot;category&quot;:&quot;Sale&quot;,&quot;subcategory1&quot;:&quot;June&quot;,&quot;subcategory2&quot;:null}">
<span>
<a class="breadcrumb-link" href="/sale/">Sale</a>
</span>
<span>&nbsp;/&nbsp;</span>
<span>
<a class="breadcrumb-link" href="/sale/june/">June</a>
</span>
</div>
<div id="filters" data-module="filters">
<div class="modal-header">
<em class="icon-close"></em>
</div>
<div class="refinement-block">
<div class="refinement-header">
<div class="refinement-header-division-mobile" aria-hidden="true">
<div class="selected-filter-section-mobile">
<div class="filter-header-mobile">
<button id="lnk-clear-all" class="clear-all-button" data-url="https://www.petsmart.ca/sale/june/">Clear All</button>
<button class="apply-button" data-subject="products">apply</button>
</div>
<div class="filter-footer-mobile">
<div class="filter-selected">
0 Filters Selected
</div>
</div>
</div>
</div>
</div>
<div class="results-hits">
1,645
Items Found
</div>
<div class="refinement  category-refinement">
<ul id="category-level-1">
<li class="category-title">
June
</li>
<li>
<a class="category refinement-link " title="Go to Category: Dog Deals" href="https://www.petsmart.ca/sale/june/dog-deals/?pmin=0.01&amp;srule=best-sellers">Dog Deals
<span class="attribute-count"> 842</span>
</a>
</li>
<li>
<a class="category refinement-link " title="Go to Category: Cat Deals" href="https://www.petsmart.ca/sale/june/cat-deals/?pmin=0.01&amp;srule=best-sellers">Cat Deals
<span class="attribute-count"> 314</span>
</a>
</li>
<li>
<a class="category refinement-link " title="Go to Category: Fish Deals" href="https://www.petsmart.ca/sale/june/fish-deals/?pmin=0.01&amp;srule=best-sellers">Fish Deals
<span class="attribute-count"> 136</span>
</a>
</li>
<li>
<a class="category refinement-link " title="Go to Category: Bird Deals" href="https://www.petsmart.ca/sale/june/bird-deals/?pmin=0.01&amp;srule=best-sellers">Bird Deals
<span class="attribute-count"> 96</span>
</a>
</li>
<li>
<a class="category refinement-link " title="Go to Category: Reptile Deals" href="https://www.petsmart.ca/sale/june/reptile-deals/?pmin=0.01&amp;srule=best-sellers">Reptile Deals
<span class="attribute-count"> 192</span>
</a>
</li>
<li>
<a class="category refinement-link " title="Go to Category: Small Pet Deals" href="https://www.petsmart.ca/sale/june/small-pet-deals/?pmin=0.01&amp;srule=best-sellers">Small Pet Deals
<span class="attribute-count"> 65</span>
</a>
</li>
<li>
<a class="category refinement-link " title="Go to Category: Treat of the Month" href="https://www.petsmart.ca/sale/june/treat-of-the-month/?pmin=0.01&amp;srule=best-sellers">Treat of the Month
<span class="attribute-count"> 12</span>
</a>
</li>
</ul>

</div>
<div class="refinement customAvailabilityLeftNav">
<h2 tabindex="0" class="accordion-item-title toggle class1" aria-expanded="false">
Shop By Store
<em class="indicator" aria-expanded="true"></em>
</h2>
<ul class="generic-refinements customAvailabilityLeftNav" data-exclusive="true" data-prefn="customAvailabilityLeftNav">
<li class="deselected client-side-deselected refinement-item refinement-item-store" data-prefv="In Store" data-prefv-value="In Store">
<a class="refinement-checkbox refinement-store-checkbox js-availability-store " data-eventname="Refinement_Event" data-lid="In Store" data-lpos="Header:In Store" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;srule=best-sellers&amp;timestamp=1718920922087" title="Refine by:In Store">
<span class="result-name">Aurora, ON</span>
<span class="attribute-count">1645</span>
</a>
<div class="availability-store">
<a data-stores="3066" class="availability-store__change js-refinement-store-change" href="javascript:void(0)" data-lid="Change Store" data-store-change-text="Change Store" title="Change Store">
Change Store
</a>
</div>
</li>
</ul>
</div>
<div class="refinement customPet">
<h2 tabindex="0" class="accordion-item-title toggle class2" aria-expanded="false">
pet
<em class="indicator" aria-expanded="false"></em>
</h2>
<ul class="generic-refinements class2 customPet" data-exclusive="false" data-prefn="customPet" class="scrollable">
<li class="deselected client-side-deselected" data-prefv="Dog" data-prefv-value="Dog">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Dog" data-lpos="Header:Dog" data-link-type="o" href="https://www.petsmart.ca/sale/june/dog/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Dog">
Dog
<span class="attribute-count"> 837 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cat" data-prefv-value="Cat">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cat" data-lpos="Header:Cat" data-link-type="o" href="https://www.petsmart.ca/sale/june/cat/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cat">
Cat
<span class="attribute-count"> 334 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Reptile" data-prefv-value="Reptile">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Reptile" data-lpos="Header:Reptile" data-link-type="o" href="https://www.petsmart.ca/sale/june/reptile/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Reptile">
Reptile
<span class="attribute-count"> 187 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Fish" data-prefv-value="Fish">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Fish" data-lpos="Header:Fish" data-link-type="o" href="https://www.petsmart.ca/sale/june/fish/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Fish">
Fish
<span class="attribute-count"> 152 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Small Pet" data-prefv-value="Small Pet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Small Pet" data-lpos="Header:Small Pet" data-link-type="o" href="https://www.petsmart.ca/sale/june/small-pet/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Small Pet">
Small Pet
<span class="attribute-count"> 90 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Bird" data-prefv-value="Bird">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Bird" data-lpos="Header:Bird" data-link-type="o" href="https://www.petsmart.ca/sale/june/bird/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Bird">
Bird
<span class="attribute-count"> 88 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Wild Bird" data-prefv-value="Wild Bird">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Wild Bird" data-lpos="Header:Wild Bird" data-link-type="o" href="https://www.petsmart.ca/sale/june/wild-bird/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Wild Bird">
Wild Bird
<span class="attribute-count"> 11 </span>
</a>
</li>
</ul>
<a href="#" class="see-all-refinements" aria-label="View More Pet">View More</a>

</div>
<div class="refinement brand">
<h2 tabindex="0" class="accordion-item-title toggle class3" aria-expanded="false">
brand
<em class="indicator" aria-expanded="false"></em>
</h2>
<ul class="generic-refinements class3 brand" data-exclusive="false" data-prefn="brand" class="scrollable">
<li class="deselected client-side-deselected" data-prefv="ADAPTIL" data-prefv-value="ADAPTIL">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ADAPTIL" data-lpos="Header:ADAPTIL" data-link-type="o" href="https://www.petsmart.ca/sale/june/adaptil/?pmin=0.01&amp;srule=best-sellers" title="Refine by:ADAPTIL">
ADAPTIL
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Advantage" data-prefv-value="Advantage">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Advantage" data-lpos="Header:Advantage" data-link-type="o" href="https://www.petsmart.ca/sale/june/advantage/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Advantage">
Advantage
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="All Living Things" data-prefv-value="All Living Things">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="All Living Things" data-lpos="Header:All Living Things" data-link-type="o" href="https://www.petsmart.ca/sale/june/all-living-things/?pmin=0.01&amp;srule=best-sellers" title="Refine by:All Living Things">
All Living Things
<span class="attribute-count"> 22 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Almo Nature" data-prefv-value="Almo Nature">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Almo Nature" data-lpos="Header:Almo Nature" data-link-type="o" href="https://www.petsmart.ca/sale/june/almo-nature/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Almo Nature">
Almo Nature
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="API" data-prefv-value="API">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="API" data-lpos="Header:API" data-link-type="o" href="https://www.petsmart.ca/sale/june/api/?pmin=0.01&amp;srule=best-sellers" title="Refine by:API">
API
<span class="attribute-count"> 23 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Applaws" data-prefv-value="Applaws">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Applaws" data-lpos="Header:Applaws" data-link-type="o" href="https://www.petsmart.ca/sale/june/applaws/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Applaws">
Applaws
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Aqua Clear" data-prefv-value="Aqua Clear">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Aqua Clear" data-lpos="Header:Aqua Clear" data-link-type="o" href="https://www.petsmart.ca/sale/june/aqua-clear/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Aqua Clear">
Aqua Clear
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Aqua Natural" data-prefv-value="Aqua Natural">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Aqua Natural" data-lpos="Header:Aqua Natural" data-link-type="o" href="https://www.petsmart.ca/sale/june/aqua-natural/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Aqua Natural">
Aqua Natural
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Arcadia Trail" data-prefv-value="Arcadia Trail">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Arcadia Trail" data-lpos="Header:Arcadia Trail" data-link-type="o" href="https://www.petsmart.ca/sale/june/arcadia-trail/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Arcadia Trail">
Arcadia Trail
<span class="attribute-count"> 55 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Arm &amp; Hammer" data-prefv-value="Arm &amp; Hammer">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Arm &amp; Hammer" data-lpos="Header:Arm &amp; Hammer" data-link-type="o" href="https://www.petsmart.ca/sale/june/arm-and-hammer/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Arm &amp; Hammer">
Arm & Hammer
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beggin' Strips" data-prefv-value="Beggin' Strips">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beggin' Strips" data-lpos="Header:Beggin' Strips" data-link-type="o" href="https://www.petsmart.ca/sale/june/beggin-strips/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Beggin' Strips">
Beggin' Strips
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beneful" data-prefv-value="Beneful">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beneful" data-lpos="Header:Beneful" data-link-type="o" href="https://www.petsmart.ca/sale/june/beneful/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Beneful">
Beneful
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Benny Bully's" data-prefv-value="Benny Bully's">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Benny Bully's" data-lpos="Header:Benny Bully's" data-link-type="o" href="https://www.petsmart.ca/sale/june/benny-bullys/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Benny Bully's">
Benny Bully's
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beyond" data-prefv-value="Beyond">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beyond" data-lpos="Header:Beyond" data-link-type="o" href="https://www.petsmart.ca/sale/june/beyond/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Beyond">
Beyond
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Blue Buffalo" data-prefv-value="Blue Buffalo">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Blue Buffalo" data-lpos="Header:Blue Buffalo" data-link-type="o" href="https://www.petsmart.ca/sale/june/blue-buffalo/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Blue Buffalo">
Blue Buffalo
<span class="attribute-count"> 91 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Brown's" data-prefv-value="Brown's">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Brown's" data-lpos="Header:Brown's" data-link-type="o" href="https://www.petsmart.ca/sale/june/browns/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Brown's">
Brown's
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Calm Paws" data-prefv-value="Calm Paws">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Calm Paws" data-lpos="Header:Calm Paws" data-link-type="o" href="https://www.petsmart.ca/sale/june/calm-paws/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Calm Paws">
Calm Paws
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Canada Pooch" data-prefv-value="Canada Pooch">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Canada Pooch" data-lpos="Header:Canada Pooch" data-link-type="o" href="https://www.petsmart.ca/sale/june/canada-pooch/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Canada Pooch">
Canada Pooch
<span class="attribute-count"> 17 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="CANIDAE" data-prefv-value="CANIDAE">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="CANIDAE" data-lpos="Header:CANIDAE" data-link-type="o" href="https://www.petsmart.ca/sale/june/canidae/?pmin=0.01&amp;srule=best-sellers" title="Refine by:CANIDAE">
CANIDAE
<span class="attribute-count"> 23 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Capstar" data-prefv-value="Capstar">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Capstar" data-lpos="Header:Capstar" data-link-type="o" href="https://www.petsmart.ca/sale/june/capstar/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Capstar">
Capstar
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Carefresh" data-prefv-value="Carefresh">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Carefresh" data-lpos="Header:Carefresh" data-link-type="o" href="https://www.petsmart.ca/sale/june/carefresh/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Carefresh">
Carefresh
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="CaribSea" data-prefv-value="CaribSea">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="CaribSea" data-lpos="Header:CaribSea" data-link-type="o" href="https://www.petsmart.ca/sale/june/caribsea/?pmin=0.01&amp;srule=best-sellers" title="Refine by:CaribSea">
CaribSea
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cesar" data-prefv-value="Cesar">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cesar" data-lpos="Header:Cesar" data-link-type="o" href="https://www.petsmart.ca/sale/june/cesar/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cesar">
Cesar
<span class="attribute-count"> 29 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Chew Time" data-prefv-value="Chew Time">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Chew Time" data-lpos="Header:Chew Time" data-link-type="o" href="https://www.petsmart.ca/sale/june/chew-time/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Chew Time">
Chew Time
<span class="attribute-count"> 36 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Chuckit!" data-prefv-value="Chuckit!">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Chuckit!" data-lpos="Header:Chuckit!" data-link-type="o" href="https://www.petsmart.ca/sale/june/chuckit/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Chuckit!">
Chuckit!
<span class="attribute-count"> 19 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Crave" data-prefv-value="Crave">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Crave" data-lpos="Header:Crave" data-link-type="o" href="https://www.petsmart.ca/sale/june/crave/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Crave">
Crave
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="DentaLife" data-prefv-value="DentaLife">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="DentaLife" data-lpos="Header:DentaLife" data-link-type="o" href="https://www.petsmart.ca/sale/june/dentalife/?pmin=0.01&amp;srule=best-sellers" title="Refine by:DentaLife">
DentaLife
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Disney" data-prefv-value="Disney">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Disney" data-lpos="Header:Disney" data-link-type="o" href="https://www.petsmart.ca/sale/june/disney/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Disney">
Disney
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Earth Rated" data-prefv-value="Earth Rated">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Earth Rated" data-lpos="Header:Earth Rated" data-link-type="o" href="https://www.petsmart.ca/sale/june/earth-rated/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Earth Rated">
Earth Rated
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Exo-Terra" data-prefv-value="Exo-Terra">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Exo-Terra" data-lpos="Header:Exo-Terra" data-link-type="o" href="https://www.petsmart.ca/sale/june/exo-terra/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Exo-Terra">
Exo-Terra
<span class="attribute-count"> 24 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="ExquisiCat" data-prefv-value="ExquisiCat">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ExquisiCat" data-lpos="Header:ExquisiCat" data-link-type="o" href="https://www.petsmart.ca/sale/june/exquisicat/?pmin=0.01&amp;srule=best-sellers" title="Refine by:ExquisiCat">
ExquisiCat
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Fancy Feast" data-prefv-value="Fancy Feast">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Fancy Feast" data-lpos="Header:Fancy Feast" data-link-type="o" href="https://www.petsmart.ca/sale/june/fancy-feast/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Fancy Feast">
Fancy Feast
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="FELIWAY" data-prefv-value="FELIWAY">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="FELIWAY" data-lpos="Header:FELIWAY" data-link-type="o" href="https://www.petsmart.ca/sale/june/feliway/?pmin=0.01&amp;srule=best-sellers" title="Refine by:FELIWAY">
FELIWAY
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Fluval" data-prefv-value="Fluval">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Fluval" data-lpos="Header:Fluval" data-link-type="o" href="https://www.petsmart.ca/sale/june/fluval/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Fluval">
Fluval
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Friskies" data-prefv-value="Friskies">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Friskies" data-lpos="Header:Friskies" data-link-type="o" href="https://www.petsmart.ca/sale/june/friskies/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Friskies">
Friskies
<span class="attribute-count"> 14 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Full Cheeks" data-prefv-value="Full Cheeks">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Full Cheeks" data-lpos="Header:Full Cheeks" data-link-type="o" href="https://www.petsmart.ca/sale/june/full-cheeks/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Full Cheeks">
Full Cheeks
<span class="attribute-count"> 26 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Garfield" data-prefv-value="Garfield">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Garfield" data-lpos="Header:Garfield" data-link-type="o" href="https://www.petsmart.ca/sale/june/garfield/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Garfield">
Garfield
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="GloFish" data-prefv-value="GloFish">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="GloFish" data-lpos="Header:GloFish" data-link-type="o" href="https://www.petsmart.ca/sale/june/glofish/?pmin=0.01&amp;srule=best-sellers" title="Refine by:GloFish">
GloFish
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="GMASON" data-prefv-value="GMASON">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="GMASON" data-lpos="Header:GMASON" data-link-type="o" href="https://www.petsmart.ca/sale/june/gmason/?pmin=0.01&amp;srule=best-sellers" title="Refine by:GMASON">
GMASON
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Great Choice" data-prefv-value="Great Choice">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Great Choice" data-lpos="Header:Great Choice" data-link-type="o" href="https://www.petsmart.ca/sale/june/great-choice/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Great Choice">
Great Choice
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Great Jack's" data-prefv-value="Great Jack's">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Great Jack's" data-lpos="Header:Great Jack's" data-link-type="o" href="https://www.petsmart.ca/sale/june/great-jacks/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Great Jack's">
Great Jack's
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Greenies" data-prefv-value="Greenies">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Greenies" data-lpos="Header:Greenies" data-link-type="o" href="https://www.petsmart.ca/sale/june/greenies/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Greenies">
Greenies
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hagen" data-prefv-value="Hagen">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hagen" data-lpos="Header:Hagen" data-link-type="o" href="https://www.petsmart.ca/sale/june/hagen/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Hagen">
Hagen
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Higgins" data-prefv-value="Higgins">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Higgins" data-lpos="Header:Higgins" data-link-type="o" href="https://www.petsmart.ca/sale/june/higgins/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Higgins">
Higgins
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hill's Science Diet" data-prefv-value="Hill's Science Diet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hill's Science Diet" data-lpos="Header:Hill's Science Diet" data-link-type="o" href="https://www.petsmart.ca/sale/june/hills-science-diet/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Hill's Science Diet">
Hill's Science Diet
<span class="attribute-count"> 64 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="HomeoPet" data-prefv-value="HomeoPet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="HomeoPet" data-lpos="Header:HomeoPet" data-link-type="o" href="https://www.petsmart.ca/sale/june/homeopet/?pmin=0.01&amp;srule=best-sellers" title="Refine by:HomeoPet">
HomeoPet
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hungry Hunter" data-prefv-value="Hungry Hunter">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hungry Hunter" data-lpos="Header:Hungry Hunter" data-link-type="o" href="https://www.petsmart.ca/sale/june/hungry-hunter/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Hungry Hunter">
Hungry Hunter
<span class="attribute-count"> 26 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Iams" data-prefv-value="Iams">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Iams" data-lpos="Header:Iams" data-link-type="o" href="https://www.petsmart.ca/sale/june/iams/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Iams">
Iams
<span class="attribute-count"> 27 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct" data-prefv-value="Instinct">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct" data-lpos="Header:Instinct" data-link-type="o" href="https://www.petsmart.ca/sale/june/instinct/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Instinct">
Instinct
<span class="attribute-count"> 69 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Jay's Tasty Adventures" data-prefv-value="Jay's Tasty Adventures">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Jay's Tasty Adventures" data-lpos="Header:Jay's Tasty Adventures" data-link-type="o" href="https://www.petsmart.ca/sale/june/jays-tasty-adventures/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Jay's Tasty Adventures">
Jay's Tasty Adventures
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Jay's Tid Bits" data-prefv-value="Jay's Tid Bits">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Jay's Tid Bits" data-lpos="Header:Jay's Tid Bits" data-link-type="o" href="https://www.petsmart.ca/sale/june/jays-tid-bits/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Jay's Tid Bits">
Jay's Tid Bits
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Joyhound" data-prefv-value="Joyhound">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Joyhound" data-lpos="Header:Joyhound" data-link-type="o" href="https://www.petsmart.ca/sale/june/joyhound/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Joyhound">
Joyhound
<span class="attribute-count"> 18 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="JW Pet" data-prefv-value="JW Pet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="JW Pet" data-lpos="Header:JW Pet" data-link-type="o" href="https://www.petsmart.ca/sale/june/jw-pet/?pmin=0.01&amp;srule=best-sellers" title="Refine by:JW Pet">
JW Pet
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="K9 Advantix" data-prefv-value="K9 Advantix">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="K9 Advantix" data-lpos="Header:K9 Advantix" data-link-type="o" href="https://www.petsmart.ca/sale/june/k9-advantix/?pmin=0.01&amp;srule=best-sellers" title="Refine by:K9 Advantix">
K9 Advantix
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="K9 Choice" data-prefv-value="K9 Choice">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="K9 Choice" data-lpos="Header:K9 Choice" data-link-type="o" href="https://www.petsmart.ca/sale/june/k9-choice/?pmin=0.01&amp;srule=best-sellers" title="Refine by:K9 Choice">
K9 Choice
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Kaytee" data-prefv-value="Kaytee">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Kaytee" data-lpos="Header:Kaytee" data-link-type="o" href="https://www.petsmart.ca/sale/june/kaytee/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Kaytee">
Kaytee
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="KONG" data-prefv-value="KONG">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="KONG" data-lpos="Header:KONG" data-link-type="o" href="https://www.petsmart.ca/sale/june/kong/?pmin=0.01&amp;srule=best-sellers" title="Refine by:KONG">
KONG
<span class="attribute-count"> 94 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Lafeber's" data-prefv-value="Lafeber's">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Lafeber's" data-lpos="Header:Lafeber's" data-link-type="o" href="https://www.petsmart.ca/sale/june/lafebers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Lafeber's">
Lafeber's
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Laguna" data-prefv-value="Laguna">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Laguna" data-lpos="Header:Laguna" data-link-type="o" href="https://www.petsmart.ca/sale/june/laguna/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Laguna">
Laguna
<span class="attribute-count"> 17 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Little Friends" data-prefv-value="Little Friends">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Little Friends" data-lpos="Header:Little Friends" data-link-type="o" href="https://www.petsmart.ca/sale/june/little-friends/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Little Friends">
Little Friends
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Living World" data-prefv-value="Living World">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Living World" data-lpos="Header:Living World" data-link-type="o" href="https://www.petsmart.ca/sale/june/living-world/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Living World">
Living World
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Marina" data-prefv-value="Marina">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Marina" data-lpos="Header:Marina" data-link-type="o" href="https://www.petsmart.ca/sale/june/marina/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Marina">
Marina
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Marineland" data-prefv-value="Marineland">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Marineland" data-lpos="Header:Marineland" data-link-type="o" href="https://www.petsmart.ca/sale/june/marineland/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Marineland">
Marineland
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Merrick" data-prefv-value="Merrick">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Merrick" data-lpos="Header:Merrick" data-link-type="o" href="https://www.petsmart.ca/sale/june/merrick/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Merrick">
Merrick
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Milk-Bone" data-prefv-value="Milk-Bone">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Milk-Bone" data-lpos="Header:Milk-Bone" data-link-type="o" href="https://www.petsmart.ca/sale/june/milk-bone/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Milk-Bone">
Milk-Bone
<span class="attribute-count"> 18 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="My Mighty Wolf" data-prefv-value="My Mighty Wolf">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="My Mighty Wolf" data-lpos="Header:My Mighty Wolf" data-link-type="o" href="https://www.petsmart.ca/sale/june/my-mighty-wolf/?pmin=0.01&amp;srule=best-sellers" title="Refine by:My Mighty Wolf">
My Mighty Wolf
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nate &amp; Jeremiah" data-prefv-value="Nate &amp; Jeremiah">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nate &amp; Jeremiah" data-lpos="Header:Nate &amp; Jeremiah" data-link-type="o" href="https://www.petsmart.ca/sale/june/nate-and-jeremiah/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nate &amp; Jeremiah">
Nate & Jeremiah
<span class="attribute-count"> 39 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nature's Recipe" data-prefv-value="Nature's Recipe">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nature's Recipe" data-lpos="Header:Nature's Recipe" data-link-type="o" href="https://www.petsmart.ca/sale/june/natures-recipe/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nature's Recipe">
Nature's Recipe
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nature's Variety Instinct" data-prefv-value="Nature's Variety Instinct">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nature's Variety Instinct" data-lpos="Header:Nature's Variety Instinct" data-link-type="o" href="https://www.petsmart.ca/sale/june/natures-variety-instinct/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nature's Variety Instinct">
Nature's Variety Instinct
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nautica" data-prefv-value="Nautica">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nautica" data-lpos="Header:Nautica" data-link-type="o" href="https://www.petsmart.ca/sale/june/nautica/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nautica">
Nautica
<span class="attribute-count"> 15 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nothin To Hide" data-prefv-value="Nothin To Hide">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nothin To Hide" data-lpos="Header:Nothin To Hide" data-link-type="o" href="https://www.petsmart.ca/sale/june/nothin-to-hide/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nothin To Hide">
Nothin To Hide
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nulo" data-prefv-value="Nulo">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nulo" data-lpos="Header:Nulo" data-link-type="o" href="https://www.petsmart.ca/sale/june/nulo/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nulo">
Nulo
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutrafin" data-prefv-value="Nutrafin">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutrafin" data-lpos="Header:Nutrafin" data-link-type="o" href="https://www.petsmart.ca/sale/june/nutrafin/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nutrafin">
Nutrafin
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutrience" data-prefv-value="Nutrience">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutrience" data-lpos="Header:Nutrience" data-link-type="o" href="https://www.petsmart.ca/sale/june/nutrience/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nutrience">
Nutrience
<span class="attribute-count"> 21 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutri-Vet" data-prefv-value="Nutri-Vet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutri-Vet" data-lpos="Header:Nutri-Vet" data-link-type="o" href="https://www.petsmart.ca/sale/june/nutri-vet/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nutri-Vet">
Nutri-Vet
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="NUTRO" data-prefv-value="NUTRO">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="NUTRO" data-lpos="Header:NUTRO" data-link-type="o" href="https://www.petsmart.ca/sale/june/nutro/?pmin=0.01&amp;srule=best-sellers" title="Refine by:NUTRO">
NUTRO
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutro Ultra" data-prefv-value="Nutro Ultra">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutro Ultra" data-lpos="Header:Nutro Ultra" data-link-type="o" href="https://www.petsmart.ca/sale/june/nutro-ultra/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nutro Ultra">
Nutro Ultra
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nylabone" data-prefv-value="Nylabone">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nylabone" data-lpos="Header:Nylabone" data-link-type="o" href="https://www.petsmart.ca/sale/june/nylabone/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nylabone">
Nylabone
<span class="attribute-count"> 64 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Omega Alpha" data-prefv-value="Omega Alpha">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Omega Alpha" data-lpos="Header:Omega Alpha" data-link-type="o" href="https://www.petsmart.ca/sale/june/omega-alpha/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Omega Alpha">
Omega Alpha
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Only Natural Pet" data-prefv-value="Only Natural Pet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Only Natural Pet" data-lpos="Header:Only Natural Pet" data-link-type="o" href="https://www.petsmart.ca/sale/june/only-natural-pet/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Only Natural Pet">
Only Natural Pet
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Oxbow" data-prefv-value="Oxbow">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Oxbow" data-lpos="Header:Oxbow" data-link-type="o" href="https://www.petsmart.ca/sale/june/oxbow/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Oxbow">
Oxbow
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pedigree" data-prefv-value="Pedigree">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pedigree" data-lpos="Header:Pedigree" data-link-type="o" href="https://www.petsmart.ca/sale/june/pedigree/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Pedigree">
Pedigree
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pet Remedy" data-prefv-value="Pet Remedy">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pet Remedy" data-lpos="Header:Pet Remedy" data-link-type="o" href="https://www.petsmart.ca/sale/june/pet-remedy/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Pet Remedy">
Pet Remedy
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="PureBites" data-prefv-value="PureBites">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="PureBites" data-lpos="Header:PureBites" data-link-type="o" href="https://www.petsmart.ca/sale/june/purebites/?pmin=0.01&amp;srule=best-sellers" title="Refine by:PureBites">
PureBites
<span class="attribute-count"> 32 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina" data-prefv-value="Purina">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina" data-lpos="Header:Purina" data-link-type="o" href="https://www.petsmart.ca/sale/june/purina/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Purina">
Purina
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina Cat Chow" data-prefv-value="Purina Cat Chow">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina Cat Chow" data-lpos="Header:Purina Cat Chow" data-link-type="o" href="https://www.petsmart.ca/sale/june/purina-cat-chow/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Purina Cat Chow">
Purina Cat Chow
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina ONE" data-prefv-value="Purina ONE">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina ONE" data-lpos="Header:Purina ONE" data-link-type="o" href="https://www.petsmart.ca/sale/june/purina-one/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Purina ONE">
Purina ONE
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina Pro Plan" data-prefv-value="Purina Pro Plan">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina Pro Plan" data-lpos="Header:Purina Pro Plan" data-link-type="o" href="https://www.petsmart.ca/sale/june/purina-pro-plan/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Purina Pro Plan">
Purina Pro Plan
<span class="attribute-count"> 35 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Red Leaf" data-prefv-value="Red Leaf">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Red Leaf" data-lpos="Header:Red Leaf" data-link-type="o" href="https://www.petsmart.ca/sale/june/red-leaf/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Red Leaf">
Red Leaf
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="ROAM" data-prefv-value="ROAM">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ROAM" data-lpos="Header:ROAM" data-link-type="o" href="https://www.petsmart.ca/sale/june/roam/?pmin=0.01&amp;srule=best-sellers" title="Refine by:ROAM">
ROAM
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Royal Canin" data-prefv-value="Royal Canin">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Royal Canin" data-lpos="Header:Royal Canin" data-link-type="o" href="https://www.petsmart.ca/sale/june/royal-canin/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Royal Canin">
Royal Canin
<span class="attribute-count"> 25 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Science Selective" data-prefv-value="Science Selective">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Science Selective" data-lpos="Header:Science Selective" data-link-type="o" href="https://www.petsmart.ca/sale/june/science-selective/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Science Selective">
Science Selective
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Sheba" data-prefv-value="Sheba">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Sheba" data-lpos="Header:Sheba" data-link-type="o" href="https://www.petsmart.ca/sale/june/sheba/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Sheba">
Sheba
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Simply Nourish" data-prefv-value="Simply Nourish">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Simply Nourish" data-lpos="Header:Simply Nourish" data-link-type="o" href="https://www.petsmart.ca/sale/june/simply-nourish/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Simply Nourish">
Simply Nourish
<span class="attribute-count"> 28 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Smart Pet Love" data-prefv-value="Smart Pet Love">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Smart Pet Love" data-lpos="Header:Smart Pet Love" data-link-type="o" href="https://www.petsmart.ca/sale/june/smart-pet-love/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Smart Pet Love">
Smart Pet Love
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Temptations" data-prefv-value="Temptations">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Temptations" data-lpos="Header:Temptations" data-link-type="o" href="https://www.petsmart.ca/sale/june/temptations/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Temptations">
Temptations
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Thrive" data-prefv-value="Thrive">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Thrive" data-lpos="Header:Thrive" data-link-type="o" href="https://www.petsmart.ca/sale/june/thrive/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Thrive">
Thrive
<span class="attribute-count"> 72 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="ThunderShirt" data-prefv-value="ThunderShirt">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ThunderShirt" data-lpos="Header:ThunderShirt" data-link-type="o" href="https://www.petsmart.ca/sale/june/thundershirt/?pmin=0.01&amp;srule=best-sellers" title="Refine by:ThunderShirt">
ThunderShirt
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Tidy Cats" data-prefv-value="Tidy Cats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Tidy Cats" data-lpos="Header:Tidy Cats" data-link-type="o" href="https://www.petsmart.ca/sale/june/tidy-cats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Tidy Cats">
Tidy Cats
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Tiki Dog" data-prefv-value="Tiki Dog">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Tiki Dog" data-lpos="Header:Tiki Dog" data-link-type="o" href="https://www.petsmart.ca/sale/june/tiki-dog/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Tiki Dog">
Tiki Dog
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Tom &amp; Sawyer vet chef" data-prefv-value="Tom &amp; Sawyer vet chef">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Tom &amp; Sawyer vet chef" data-lpos="Header:Tom &amp; Sawyer vet chef" data-link-type="o" href="https://www.petsmart.ca/sale/june/tom-and-sawyer-vet-chef/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Tom &amp; Sawyer vet chef">
Tom & Sawyer vet chef
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Top Fin" data-prefv-value="Top Fin">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Top Fin" data-lpos="Header:Top Fin" data-link-type="o" href="https://www.petsmart.ca/sale/june/top-fin/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Top Fin">
Top Fin
<span class="attribute-count"> 52 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Tropican" data-prefv-value="Tropican">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Tropican" data-lpos="Header:Tropican" data-link-type="o" href="https://www.petsmart.ca/sale/june/tropican/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Tropican">
Tropican
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="VitaCat" data-prefv-value="VitaCat">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="VitaCat" data-lpos="Header:VitaCat" data-link-type="o" href="https://www.petsmart.ca/sale/june/vitacat/?pmin=0.01&amp;srule=best-sellers" title="Refine by:VitaCat">
VitaCat
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Vitakraft" data-prefv-value="Vitakraft">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Vitakraft" data-lpos="Header:Vitakraft" data-link-type="o" href="https://www.petsmart.ca/sale/june/vitakraft/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Vitakraft">
Vitakraft
<span class="attribute-count"> 13 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Waggers" data-prefv-value="Waggers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Waggers" data-lpos="Header:Waggers" data-link-type="o" href="https://www.petsmart.ca/sale/june/waggers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Waggers">
Waggers
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Wahl" data-prefv-value="Wahl">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Wahl" data-lpos="Header:Wahl" data-link-type="o" href="https://www.petsmart.ca/sale/june/wahl/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Wahl">
Wahl
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Wellness" data-prefv-value="Wellness">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Wellness" data-lpos="Header:Wellness" data-link-type="o" href="https://www.petsmart.ca/sale/june/wellness/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Wellness">
Wellness
<span class="attribute-count"> 19 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Whimzees" data-prefv-value="Whimzees">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Whimzees" data-lpos="Header:Whimzees" data-link-type="o" href="https://www.petsmart.ca/sale/june/whimzees/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Whimzees">
Whimzees
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Whiskas" data-prefv-value="Whiskas">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Whiskas" data-lpos="Header:Whiskas" data-link-type="o" href="https://www.petsmart.ca/sale/june/whiskas/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Whiskas">
Whiskas
<span class="attribute-count"> 25 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Zesty Paws" data-prefv-value="Zesty Paws">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Zesty Paws" data-lpos="Header:Zesty Paws" data-link-type="o" href="https://www.petsmart.ca/sale/june/zesty-paws/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Zesty Paws">
Zesty Paws
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Zoo Med" data-prefv-value="Zoo Med">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Zoo Med" data-lpos="Header:Zoo Med" data-link-type="o" href="https://www.petsmart.ca/sale/june/zoo-med/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Zoo Med">
Zoo Med
<span class="attribute-count"> 64 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="ZuPreem" data-prefv-value="ZuPreem">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ZuPreem" data-lpos="Header:ZuPreem" data-link-type="o" href="https://www.petsmart.ca/sale/june/zupreem/?pmin=0.01&amp;srule=best-sellers" title="Refine by:ZuPreem">
ZuPreem
<span class="attribute-count"> 23 </span>
</a>
</li>
</ul>
<a href="#" class="see-all-refinements" aria-label="View More Brand">View More</a>

</div>
<div class="refinement customCategory">
<h2 tabindex="0" class="accordion-item-title toggle class4" aria-expanded="false">
category
<em class="indicator" aria-expanded="false"></em>
</h2>
<ul class="generic-refinements class4 customCategory" data-exclusive="false" data-prefn="customCategory" class="scrollable">
<li class="deselected client-side-deselected" data-prefv="Accessories" data-prefv-value="Accessories">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Accessories" data-lpos="Header:Accessories" data-link-type="o" href="https://www.petsmart.ca/sale/june/accessories/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Accessories">
Accessories
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Algae Control" data-prefv-value="Algae Control">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Algae Control" data-lpos="Header:Algae Control" data-link-type="o" href="https://www.petsmart.ca/sale/june/algae-control/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Algae Control">
Algae Control
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Aquariums" data-prefv-value="Aquariums">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Aquariums" data-lpos="Header:Aquariums" data-link-type="o" href="https://www.petsmart.ca/sale/june/aquariums/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Aquariums">
Aquariums
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Aquarium Stands" data-prefv-value="Aquarium Stands">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Aquarium Stands" data-lpos="Header:Aquarium Stands" data-link-type="o" href="https://www.petsmart.ca/sale/june/aquarium-stands/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Aquarium Stands">
Aquarium Stands
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Artificial Plants" data-prefv-value="Artificial Plants">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Artificial Plants" data-lpos="Header:Artificial Plants" data-link-type="o" href="https://www.petsmart.ca/sale/june/artificial-plants/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Artificial Plants">
Artificial Plants
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Bandanas, Bows &amp; Hats" data-prefv-value="Bandanas, Bows &amp; Hats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Bandanas, Bows &amp; Hats" data-lpos="Header:Bandanas, Bows &amp; Hats" data-link-type="o" href="https://www.petsmart.ca/sale/june/bandanas-bows-and-hats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Bandanas, Bows &amp; Hats">
Bandanas, Bows & Hats
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Bedding" data-prefv-value="Bedding">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Bedding" data-lpos="Header:Bedding" data-link-type="o" href="https://www.petsmart.ca/sale/june/bedding/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Bedding">
Bedding
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beds" data-prefv-value="Beds">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beds" data-lpos="Header:Beds" data-link-type="o" href="https://www.petsmart.ca/sale/june/beds/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Beds">
Beds
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Biscuits &amp; Bakery" data-prefv-value="Biscuits &amp; Bakery">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Biscuits &amp; Bakery" data-lpos="Header:Biscuits &amp; Bakery" data-link-type="o" href="https://www.petsmart.ca/sale/june/biscuits-and-bakery/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Biscuits &amp; Bakery">
Biscuits & Bakery
<span class="attribute-count"> 16 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Bones &amp; Rawhide" data-prefv-value="Bones &amp; Rawhide">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Bones &amp; Rawhide" data-lpos="Header:Bones &amp; Rawhide" data-link-type="o" href="https://www.petsmart.ca/sale/june/bones-and-rawhide/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Bones &amp; Rawhide">
Bones & Rawhide
<span class="attribute-count"> 21 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Brushes &amp; Scrubbers" data-prefv-value="Brushes &amp; Scrubbers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Brushes &amp; Scrubbers" data-lpos="Header:Brushes &amp; Scrubbers" data-link-type="o" href="https://www.petsmart.ca/sale/june/brushes-and-scrubbers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Brushes &amp; Scrubbers">
Brushes & Scrubbers
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Bulbs &amp; Lamps" data-prefv-value="Bulbs &amp; Lamps">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Bulbs &amp; Lamps" data-lpos="Header:Bulbs &amp; Lamps" data-link-type="o" href="https://www.petsmart.ca/sale/june/bulbs-and-lamps/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Bulbs &amp; Lamps">
Bulbs & Lamps
<span class="attribute-count"> 24 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cage Liners" data-prefv-value="Cage Liners">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cage Liners" data-lpos="Header:Cage Liners" data-link-type="o" href="https://www.petsmart.ca/sale/june/cage-liners/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cage Liners">
Cage Liners
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cages" data-prefv-value="Cages">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cages" data-lpos="Header:Cages" data-link-type="o" href="https://www.petsmart.ca/sale/june/cages/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cages">
Cages
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Canned Food" data-prefv-value="Canned Food">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Canned Food" data-lpos="Header:Canned Food" data-link-type="o" href="https://www.petsmart.ca/sale/june/canned-food/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Canned Food">
Canned Food
<span class="attribute-count"> 199 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Chewy Treats" data-prefv-value="Chewy Treats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Chewy Treats" data-lpos="Header:Chewy Treats" data-link-type="o" href="https://www.petsmart.ca/sale/june/chewy-treats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Chewy Treats">
Chewy Treats
<span class="attribute-count"> 59 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cleaners &amp; Brushes" data-prefv-value="Cleaners &amp; Brushes">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cleaners &amp; Brushes" data-lpos="Header:Cleaners &amp; Brushes" data-link-type="o" href="https://www.petsmart.ca/sale/june/cleaners-and-brushes/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cleaners &amp; Brushes">
Cleaners & Brushes
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Clothing &amp; Accessories" data-prefv-value="Clothing &amp; Accessories">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Clothing &amp; Accessories" data-lpos="Header:Clothing &amp; Accessories" data-link-type="o" href="https://www.petsmart.ca/sale/june/clothing-and-accessories/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Clothing &amp; Accessories">
Clothing & Accessories
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Collars" data-prefv-value="Collars">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Collars" data-lpos="Header:Collars" data-link-type="o" href="https://www.petsmart.ca/sale/june/collars/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Collars">
Collars
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Crunchy Treats" data-prefv-value="Crunchy Treats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Crunchy Treats" data-lpos="Header:Crunchy Treats" data-link-type="o" href="https://www.petsmart.ca/sale/june/crunchy-treats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Crunchy Treats">
Crunchy Treats
<span class="attribute-count"> 16 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cups" data-prefv-value="Cups">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cups" data-lpos="Header:Cups" data-link-type="o" href="https://www.petsmart.ca/sale/june/cups/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cups">
Cups
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Cycling Aids/Bacteria" data-prefv-value="Cycling Aids/Bacteria">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Cycling Aids/Bacteria" data-lpos="Header:Cycling Aids/Bacteria" data-link-type="o" href="https://www.petsmart.ca/sale/june/cycling-aids%2Fbacteria/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Cycling Aids/Bacteria">
Cycling Aids/Bacteria
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Decor &amp; Gravel" data-prefv-value="Decor &amp; Gravel">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Decor &amp; Gravel" data-lpos="Header:Decor &amp; Gravel" data-link-type="o" href="https://www.petsmart.ca/sale/june/decor-and-gravel/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Decor &amp; Gravel">
Decor & Gravel
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Dental Treats" data-prefv-value="Dental Treats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Dental Treats" data-lpos="Header:Dental Treats" data-link-type="o" href="https://www.petsmart.ca/sale/june/dental-treats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Dental Treats">
Dental Treats
<span class="attribute-count"> 17 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Disease Treatment" data-prefv-value="Disease Treatment">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Disease Treatment" data-lpos="Header:Disease Treatment" data-link-type="o" href="https://www.petsmart.ca/sale/june/disease-treatment/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Disease Treatment">
Disease Treatment
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Dog Pads" data-prefv-value="Dog Pads">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Dog Pads" data-lpos="Header:Dog Pads" data-link-type="o" href="https://www.petsmart.ca/sale/june/dog-pads/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Dog Pads">
Dog Pads
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Dry Food" data-prefv-value="Dry Food">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Dry Food" data-lpos="Header:Dry Food" data-link-type="o" href="https://www.petsmart.ca/sale/june/dry-food/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Dry Food">
Dry Food
<span class="attribute-count"> 243 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Feeders" data-prefv-value="Feeders">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Feeders" data-lpos="Header:Feeders" data-link-type="o" href="https://www.petsmart.ca/sale/june/feeders/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Feeders">
Feeders
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Feeding Accessories" data-prefv-value="Feeding Accessories">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Feeding Accessories" data-lpos="Header:Feeding Accessories" data-link-type="o" href="https://www.petsmart.ca/sale/june/feeding-accessories/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Feeding Accessories">
Feeding Accessories
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Fertilizers &amp; Supplements" data-prefv-value="Fertilizers &amp; Supplements">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Fertilizers &amp; Supplements" data-lpos="Header:Fertilizers &amp; Supplements" data-link-type="o" href="https://www.petsmart.ca/sale/june/fertilizers-and-supplements/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Fertilizers &amp; Supplements">
Fertilizers & Supplements
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Filter Media" data-prefv-value="Filter Media">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Filter Media" data-lpos="Header:Filter Media" data-link-type="o" href="https://www.petsmart.ca/sale/june/filter-media/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Filter Media">
Filter Media
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Filters" data-prefv-value="Filters">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Filters" data-lpos="Header:Filters" data-link-type="o" href="https://www.petsmart.ca/sale/june/filters/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Filters">
Filters
<span class="attribute-count"> 14 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Food" data-prefv-value="Food">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Food" data-lpos="Header:Food" data-link-type="o" href="https://www.petsmart.ca/sale/june/food/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Food">
Food
<span class="attribute-count"> 123 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Food &amp; Water Accessories" data-prefv-value="Food &amp; Water Accessories">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Food &amp; Water Accessories" data-lpos="Header:Food &amp; Water Accessories" data-link-type="o" href="https://www.petsmart.ca/sale/june/food-and-water-accessories/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Food &amp; Water Accessories">
Food & Water Accessories
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Food &amp; Water Bowls" data-prefv-value="Food &amp; Water Bowls">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Food &amp; Water Bowls" data-lpos="Header:Food &amp; Water Bowls" data-link-type="o" href="https://www.petsmart.ca/sale/june/food-and-water-bowls/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Food &amp; Water Bowls">
Food & Water Bowls
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Food Pouches" data-prefv-value="Food Pouches">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Food Pouches" data-lpos="Header:Food Pouches" data-link-type="o" href="https://www.petsmart.ca/sale/june/food-pouches/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Food Pouches">
Food Pouches
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Food Storage" data-prefv-value="Food Storage">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Food Storage" data-lpos="Header:Food Storage" data-link-type="o" href="https://www.petsmart.ca/sale/june/food-storage/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Food Storage">
Food Storage
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Food Toppers" data-prefv-value="Food Toppers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Food Toppers" data-lpos="Header:Food Toppers" data-link-type="o" href="https://www.petsmart.ca/sale/june/food-toppers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Food Toppers">
Food Toppers
<span class="attribute-count"> 76 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Freeze Dried" data-prefv-value="Freeze Dried">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Freeze Dried" data-lpos="Header:Freeze Dried" data-link-type="o" href="https://www.petsmart.ca/sale/june/freeze-dried/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Freeze Dried">
Freeze Dried
<span class="attribute-count"> 30 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Fresh &amp; Frozen Food" data-prefv-value="Fresh &amp; Frozen Food">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Fresh &amp; Frozen Food" data-lpos="Header:Fresh &amp; Frozen Food" data-link-type="o" href="https://www.petsmart.ca/sale/june/fresh-and-frozen-food/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Fresh &amp; Frozen Food">
Fresh & Frozen Food
<span class="attribute-count"> 16 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Fresh Food" data-prefv-value="Fresh Food">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Fresh Food" data-lpos="Header:Fresh Food" data-link-type="o" href="https://www.petsmart.ca/sale/june/fresh-food/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Fresh Food">
Fresh Food
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Frozen Food" data-prefv-value="Frozen Food">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Frozen Food" data-lpos="Header:Frozen Food" data-link-type="o" href="https://www.petsmart.ca/sale/june/frozen-food/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Frozen Food">
Frozen Food
<span class="attribute-count"> 18 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Frozen Treats &amp; Ice Cream" data-prefv-value="Frozen Treats &amp; Ice Cream">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Frozen Treats &amp; Ice Cream" data-lpos="Header:Frozen Treats &amp; Ice Cream" data-link-type="o" href="https://www.petsmart.ca/sale/june/frozen-treats-and-ice-cream/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Frozen Treats &amp; Ice Cream">
Frozen Treats & Ice Cream
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Gravel &amp; Sand" data-prefv-value="Gravel &amp; Sand">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Gravel &amp; Sand" data-lpos="Header:Gravel &amp; Sand" data-link-type="o" href="https://www.petsmart.ca/sale/june/gravel-and-sand/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Gravel &amp; Sand">
Gravel & Sand
<span class="attribute-count"> 41 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Grooming" data-prefv-value="Grooming">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Grooming" data-lpos="Header:Grooming" data-link-type="o" href="https://www.petsmart.ca/sale/june/grooming/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Grooming">
Grooming
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Habitat Decor" data-prefv-value="Habitat Decor">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Habitat Decor" data-lpos="Header:Habitat Decor" data-link-type="o" href="https://www.petsmart.ca/sale/june/habitat-decor/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Habitat Decor">
Habitat Decor
<span class="attribute-count"> 41 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Habitat Expansions" data-prefv-value="Habitat Expansions">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Habitat Expansions" data-lpos="Header:Habitat Expansions" data-link-type="o" href="https://www.petsmart.ca/sale/june/habitat-expansions/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Habitat Expansions">
Habitat Expansions
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Harnesses" data-prefv-value="Harnesses">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Harnesses" data-lpos="Header:Harnesses" data-link-type="o" href="https://www.petsmart.ca/sale/june/harnesses/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Harnesses">
Harnesses
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hay" data-prefv-value="Hay">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hay" data-lpos="Header:Hay" data-link-type="o" href="https://www.petsmart.ca/sale/june/hay/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Hay">
Hay
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Health &amp; Wellness" data-prefv-value="Health &amp; Wellness">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Health &amp; Wellness" data-lpos="Header:Health &amp; Wellness" data-link-type="o" href="https://www.petsmart.ca/sale/june/health-and-wellness/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Health &amp; Wellness">
Health & Wellness
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Heaters" data-prefv-value="Heaters">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Heaters" data-lpos="Header:Heaters" data-link-type="o" href="https://www.petsmart.ca/sale/june/heaters/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Heaters">
Heaters
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Houses" data-prefv-value="Houses">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Houses" data-lpos="Header:Houses" data-link-type="o" href="https://www.petsmart.ca/sale/june/houses/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Houses">
Houses
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Jerky" data-prefv-value="Jerky">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Jerky" data-lpos="Header:Jerky" data-link-type="o" href="https://www.petsmart.ca/sale/june/jerky/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Jerky">
Jerky
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Leashes" data-prefv-value="Leashes">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Leashes" data-lpos="Header:Leashes" data-link-type="o" href="https://www.petsmart.ca/sale/june/leashes/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Leashes">
Leashes
<span class="attribute-count"> 16 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Light Fixtures" data-prefv-value="Light Fixtures">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Light Fixtures" data-lpos="Header:Light Fixtures" data-link-type="o" href="https://www.petsmart.ca/sale/june/light-fixtures/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Light Fixtures">
Light Fixtures
<span class="attribute-count"> 15 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Litter" data-prefv-value="Litter">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Litter" data-lpos="Header:Litter" data-link-type="o" href="https://www.petsmart.ca/sale/june/litter/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Litter">
Litter
<span class="attribute-count"> 34 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Live Birds" data-prefv-value="Live Birds">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Live Birds" data-lpos="Header:Live Birds" data-link-type="o" href="https://www.petsmart.ca/sale/june/live-birds/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Live Birds">
Live Birds
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nate &amp; Jeremiah Stands" data-prefv-value="Nate &amp; Jeremiah Stands">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nate &amp; Jeremiah Stands" data-lpos="Header:Nate &amp; Jeremiah Stands" data-link-type="o" href="https://www.petsmart.ca/sale/june/nate-and-jeremiah-stands/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Nate &amp; Jeremiah Stands">
Nate & Jeremiah Stands
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Ornaments" data-prefv-value="Ornaments">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Ornaments" data-lpos="Header:Ornaments" data-link-type="o" href="https://www.petsmart.ca/sale/june/ornaments/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Ornaments">
Ornaments
<span class="attribute-count"> 15 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="PH Adjusters" data-prefv-value="PH Adjusters">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="PH Adjusters" data-lpos="Header:PH Adjusters" data-link-type="o" href="https://www.petsmart.ca/sale/june/ph-adjusters/?pmin=0.01&amp;srule=best-sellers" title="Refine by:PH Adjusters">
PH Adjusters
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pills" data-prefv-value="Pills">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pills" data-lpos="Header:Pills" data-link-type="o" href="https://www.petsmart.ca/sale/june/pills/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Pills">
Pills
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Poop Bags" data-prefv-value="Poop Bags">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Poop Bags" data-lpos="Header:Poop Bags" data-link-type="o" href="https://www.petsmart.ca/sale/june/poop-bags/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Poop Bags">
Poop Bags
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Potty Training" data-prefv-value="Potty Training">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Potty Training" data-lpos="Header:Potty Training" data-link-type="o" href="https://www.petsmart.ca/sale/june/potty-training/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Potty Training">
Potty Training
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pumps" data-prefv-value="Pumps">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pumps" data-lpos="Header:Pumps" data-link-type="o" href="https://www.petsmart.ca/sale/june/pumps/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Pumps">
Pumps
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Replacement Parts" data-prefv-value="Replacement Parts">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Replacement Parts" data-lpos="Header:Replacement Parts" data-link-type="o" href="https://www.petsmart.ca/sale/june/replacement-parts/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Replacement Parts">
Replacement Parts
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Safety Harnesses" data-prefv-value="Safety Harnesses">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Safety Harnesses" data-lpos="Header:Safety Harnesses" data-link-type="o" href="https://www.petsmart.ca/sale/june/safety-harnesses/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Safety Harnesses">
Safety Harnesses
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Shoes &amp; Socks" data-prefv-value="Shoes &amp; Socks">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Shoes &amp; Socks" data-lpos="Header:Shoes &amp; Socks" data-link-type="o" href="https://www.petsmart.ca/sale/june/shoes-and-socks/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Shoes &amp; Socks">
Shoes & Socks
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Soft Treats" data-prefv-value="Soft Treats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Soft Treats" data-lpos="Header:Soft Treats" data-link-type="o" href="https://www.petsmart.ca/sale/june/soft-treats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Soft Treats">
Soft Treats
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Spot Ons" data-prefv-value="Spot Ons">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Spot Ons" data-lpos="Header:Spot Ons" data-link-type="o" href="https://www.petsmart.ca/sale/june/spot-ons/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Spot Ons">
Spot Ons
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Sprays &amp; Diffusers" data-prefv-value="Sprays &amp; Diffusers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Sprays &amp; Diffusers" data-lpos="Header:Sprays &amp; Diffusers" data-link-type="o" href="https://www.petsmart.ca/sale/june/sprays-and-diffusers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Sprays &amp; Diffusers">
Sprays & Diffusers
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Stones &amp; Gems" data-prefv-value="Stones &amp; Gems">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Stones &amp; Gems" data-lpos="Header:Stones &amp; Gems" data-link-type="o" href="https://www.petsmart.ca/sale/june/stones-and-gems/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Stones &amp; Gems">
Stones & Gems
<span class="attribute-count"> 18 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Stress &amp; Anxiety Relief" data-prefv-value="Stress &amp; Anxiety Relief">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Stress &amp; Anxiety Relief" data-lpos="Header:Stress &amp; Anxiety Relief" data-link-type="o" href="https://www.petsmart.ca/sale/june/stress-and-anxiety-relief/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Stress &amp; Anxiety Relief">
Stress & Anxiety Relief
<span class="attribute-count"> 30 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Strollers" data-prefv-value="Strollers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Strollers" data-lpos="Header:Strollers" data-link-type="o" href="https://www.petsmart.ca/sale/june/strollers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Strollers">
Strollers
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Substrate &amp; Bedding" data-prefv-value="Substrate &amp; Bedding">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Substrate &amp; Bedding" data-lpos="Header:Substrate &amp; Bedding" data-link-type="o" href="https://www.petsmart.ca/sale/june/substrate-and-bedding/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Substrate &amp; Bedding">
Substrate & Bedding
<span class="attribute-count"> 33 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Sweaters &amp; Coats" data-prefv-value="Sweaters &amp; Coats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Sweaters &amp; Coats" data-lpos="Header:Sweaters &amp; Coats" data-link-type="o" href="https://www.petsmart.ca/sale/june/sweaters-and-coats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Sweaters &amp; Coats">
Sweaters & Coats
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Tank Dividers &amp; Containers" data-prefv-value="Tank Dividers &amp; Containers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Tank Dividers &amp; Containers" data-lpos="Header:Tank Dividers &amp; Containers" data-link-type="o" href="https://www.petsmart.ca/sale/june/tank-dividers-and-containers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Tank Dividers &amp; Containers">
Tank Dividers & Containers
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Terrariums" data-prefv-value="Terrariums">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Terrariums" data-lpos="Header:Terrariums" data-link-type="o" href="https://www.petsmart.ca/sale/june/terrariums/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Terrariums">
Terrariums
<span class="attribute-count"> 14 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Test Kits" data-prefv-value="Test Kits">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Test Kits" data-lpos="Header:Test Kits" data-link-type="o" href="https://www.petsmart.ca/sale/june/test-kits/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Test Kits">
Test Kits
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Toys" data-prefv-value="Toys">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Toys" data-lpos="Header:Toys" data-link-type="o" href="https://www.petsmart.ca/sale/june/toys/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Toys">
Toys
<span class="attribute-count"> 229 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Training Collars, Leashes &amp; Harnesses" data-prefv-value="Training Collars, Leashes &amp; Harnesses">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Training Collars, Leashes &amp; Harnesses" data-lpos="Header:Training Collars, Leashes &amp; Harnesses" data-link-type="o" href="https://www.petsmart.ca/sale/june/training-collars-leashes-and-harnesses/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Training Collars, Leashes &amp; Harnesses">
Training Collars, Leashes & Harnesses
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Training Treats" data-prefv-value="Training Treats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Training Treats" data-lpos="Header:Training Treats" data-link-type="o" href="https://www.petsmart.ca/sale/june/training-treats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Training Treats">
Training Treats
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Treat Holders" data-prefv-value="Treat Holders">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Treat Holders" data-lpos="Header:Treat Holders" data-link-type="o" href="https://www.petsmart.ca/sale/june/treat-holders/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Treat Holders">
Treat Holders
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Treats" data-prefv-value="Treats">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Treats" data-lpos="Header:Treats" data-link-type="o" href="https://www.petsmart.ca/sale/june/treats/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Treats">
Treats
<span class="attribute-count"> 91 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="T-Shirts &amp; Tank Tops" data-prefv-value="T-Shirts &amp; Tank Tops">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="T-Shirts &amp; Tank Tops" data-lpos="Header:T-Shirts &amp; Tank Tops" data-link-type="o" href="https://www.petsmart.ca/sale/june/t-shirts-and-tank-tops/?pmin=0.01&amp;srule=best-sellers" title="Refine by:T-Shirts &amp; Tank Tops">
T-Shirts & Tank Tops
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Vitamins &amp; Supplements" data-prefv-value="Vitamins &amp; Supplements">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Vitamins &amp; Supplements" data-lpos="Header:Vitamins &amp; Supplements" data-link-type="o" href="https://www.petsmart.ca/sale/june/vitamins-and-supplements/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Vitamins &amp; Supplements">
Vitamins & Supplements
<span class="attribute-count"> 13 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Waste Disposal" data-prefv-value="Waste Disposal">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Waste Disposal" data-lpos="Header:Waste Disposal" data-link-type="o" href="https://www.petsmart.ca/sale/june/waste-disposal/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Waste Disposal">
Waste Disposal
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Waste Removers" data-prefv-value="Waste Removers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Waste Removers" data-lpos="Header:Waste Removers" data-link-type="o" href="https://www.petsmart.ca/sale/june/waste-removers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Waste Removers">
Waste Removers
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Water Care &amp; Conditioners" data-prefv-value="Water Care &amp; Conditioners">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Water Care &amp; Conditioners" data-lpos="Header:Water Care &amp; Conditioners" data-link-type="o" href="https://www.petsmart.ca/sale/june/water-care-and-conditioners/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Water Care &amp; Conditioners">
Water Care & Conditioners
<span class="attribute-count"> 21 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Water Clarifiers" data-prefv-value="Water Clarifiers">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Water Clarifiers" data-lpos="Header:Water Clarifiers" data-link-type="o" href="https://www.petsmart.ca/sale/june/water-clarifiers/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Water Clarifiers">
Water Clarifiers
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Water Conditioners" data-prefv-value="Water Conditioners">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Water Conditioners" data-lpos="Header:Water Conditioners" data-link-type="o" href="https://www.petsmart.ca/sale/june/water-conditioners/?pmin=0.01&amp;srule=best-sellers" title="Refine by:Water Conditioners">
Water Conditioners
<span class="attribute-count"> 8 </span>
</a>
</li>
</ul>
<a href="#" class="see-all-refinements" aria-label="View More Category">View More</a>

</div>
<div class="refinement ">

<h2 tabindex="0" class="accordion-item-title toggle class5" aria-expanded="false" data-prefn="Price">
price
<em class="fa indicator"></em>
</h2>
<ul class="generic-refinements class5 Price" data-prefn="Price" data-exclusive="true">
<li class="deselected client-side-deselected" data-prefv="&lt;$5" data-prefvPrice="pmin=0.0&pmax=5.0" data-prefv-from="0.0" data-prefv-to="5.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="&lt;$5" data-lpos="Header:&lt;$5" data-link-type="o" title="Refine by Price: &lt;$5" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=0.00&amp;pmax=5.00">
&lt;$5
<span class="attribute-count"> 270 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$5 - $10" data-prefvPrice="pmin=5.0&pmax=10.0" data-prefv-from="5.0" data-prefv-to="10.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$5 - $10" data-lpos="Header:$5 - $10" data-link-type="o" title="Refine by Price: $5 - $10" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=5.00&amp;pmax=10.00">
$5 - $10
<span class="attribute-count"> 250 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$15 - $20" data-prefvPrice="pmin=10.0&pmax=15.0" data-prefv-from="10.0" data-prefv-to="15.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$15 - $20" data-lpos="Header:$15 - $20" data-link-type="o" title="Refine by Price: $15 - $20" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=10.00&amp;pmax=15.00">
$15 - $20
<span class="attribute-count"> 247 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$20 - $25" data-prefvPrice="pmin=15.0&pmax=20.0" data-prefv-from="15.0" data-prefv-to="20.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$20 - $25" data-lpos="Header:$20 - $25" data-link-type="o" title="Refine by Price: $20 - $25" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=15.00&amp;pmax=20.00">
$20 - $25
<span class="attribute-count"> 271 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$25 - $50" data-prefvPrice="pmin=20.0&pmax=25.0" data-prefv-from="20.0" data-prefv-to="25.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$25 - $50" data-lpos="Header:$25 - $50" data-link-type="o" title="Refine by Price: $25 - $50" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=20.00&amp;pmax=25.00">
$25 - $50
<span class="attribute-count"> 187 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$50 - $75" data-prefvPrice="pmin=25.0&pmax=50.0" data-prefv-from="25.0" data-prefv-to="50.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$50 - $75" data-lpos="Header:$50 - $75" data-link-type="o" title="Refine by Price: $50 - $75" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=25.00&amp;pmax=50.00">
$50 - $75
<span class="attribute-count"> 463 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$75 - $100" data-prefvPrice="pmin=50.0&pmax=75.0" data-prefv-from="50.0" data-prefv-to="75.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$75 - $100" data-lpos="Header:$75 - $100" data-link-type="o" title="Refine by Price: $75 - $100" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=50.00&amp;pmax=75.00">
$75 - $100
<span class="attribute-count"> 168 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$100 - $125" data-prefvPrice="pmin=75.0&pmax=100.0" data-prefv-from="75.0" data-prefv-to="100.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$100 - $125" data-lpos="Header:$100 - $125" data-link-type="o" title="Refine by Price: $100 - $125" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=75.00&amp;pmax=100.00">
$100 - $125
<span class="attribute-count"> 105 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="$125 - $150" data-prefvPrice="pmin=100.0&pmax=125.0" data-prefv-from="100.0" data-prefv-to="125.0">
<a class="refinement-checkbox refinement-link" data-eventname="Refinement_Event" data-lid="$125 - $150" data-lpos="Header:$125 - $150" data-link-type="o" title="Refine by Price: $125 - $150" href="https://www.petsmart.ca/sale/june/?srule=best-sellers&amp;pmin=100.00&amp;pmax=125.00">
$125 - $150
<span class="attribute-count"> 48 </span>
</a>
</li>
</ul>
<a href="#" class="see-all-refinements" aria-label="View More Price">View More</a>
</div>
<div class="refinement customBvAverageRating">
<h2 tabindex="0" class="accordion-item-title toggle class6" aria-expanded="false">
product rating
<em class="indicator" aria-expanded="false"></em>
</h2>
<ul class="generic-refinements class6 customBvAverageRating" data-exclusive="false" data-prefn="customBvAverageRating">
<li class="deselected client-side-deselected" data-prefv="&lt; 1" data-prefv-value="&lt; 1">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="&lt; 1" data-lpos="Header:&lt; 1" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customBvAverageRating&amp;prefv1=%3C%201&amp;srule=best-sellers" title="Refine by:&lt; 1">
< 1
<span class="attribute-count"> 471 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="1 - 2" data-prefv-value="1 - 2">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="1 - 2" data-lpos="Header:1 - 2" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customBvAverageRating&amp;prefv1=1%20-%202&amp;srule=best-sellers" title="Refine by:1 - 2">
1 - 2
<span class="attribute-count"> 39 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="2 - 3" data-prefv-value="2 - 3">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="2 - 3" data-lpos="Header:2 - 3" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customBvAverageRating&amp;prefv1=2%20-%203&amp;srule=best-sellers" title="Refine by:2 - 3">
2 - 3
<span class="attribute-count"> 67 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="3 - 4" data-prefv-value="3 - 4">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="3 - 4" data-lpos="Header:3 - 4" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customBvAverageRating&amp;prefv1=3%20-%204&amp;srule=best-sellers" title="Refine by:3 - 4">
3 - 4
<span class="attribute-count"> 228 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="&gt; 4" data-prefv-value="&gt; 4">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="&gt; 4" data-lpos="Header:&gt; 4" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customBvAverageRating&amp;prefv1=%3E%204&amp;srule=best-sellers" title="Refine by:&gt; 4">
> 4
<span class="attribute-count"> 1,101 </span>
</a>
</li>
</ul>
<a href="#" class="see-all-refinements" aria-label="View More Product Rating">View More</a>

</div>
<div class="refinement customSeries">
<h2 tabindex="0" class="accordion-item-title toggle class7" aria-expanded="false">
series
<em class="indicator" aria-expanded="false"></em>
</h2>
<ul class="generic-refinements class7 customSeries" data-exclusive="false" data-prefn="customSeries" class="scrollable">
<li class="deselected client-side-deselected" data-prefv="ADAPTIL Calm Collar" data-prefv-value="ADAPTIL Calm Collar">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ADAPTIL Calm Collar" data-lpos="Header:ADAPTIL Calm Collar" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=ADAPTIL%20Calm%20Collar&amp;srule=best-sellers" title="Refine by:ADAPTIL Calm Collar">
ADAPTIL Calm Collar
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="ADAPTIL Calm Home Diffuser" data-prefv-value="ADAPTIL Calm Home Diffuser">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ADAPTIL Calm Home Diffuser" data-lpos="Header:ADAPTIL Calm Home Diffuser" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=ADAPTIL%20Calm%20Home%20Diffuser&amp;srule=best-sellers" title="Refine by:ADAPTIL Calm Home Diffuser">
ADAPTIL Calm Home Diffuser
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="ADAPTIL Transport Spray" data-prefv-value="ADAPTIL Transport Spray">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="ADAPTIL Transport Spray" data-lpos="Header:ADAPTIL Transport Spray" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=ADAPTIL%20Transport%20Spray&amp;srule=best-sellers" title="Refine by:ADAPTIL Transport Spray">
ADAPTIL Transport Spray
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Arm &amp; Hammer Premium Litter" data-prefv-value="Arm &amp; Hammer Premium Litter">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Arm &amp; Hammer Premium Litter" data-lpos="Header:Arm &amp; Hammer Premium Litter" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Arm%20%26%20Hammer%20Premium%20Litter&amp;srule=best-sellers" title="Refine by:Arm &amp; Hammer Premium Litter">
Arm & Hammer Premium Litter
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beneful IncrediBites" data-prefv-value="Beneful IncrediBites">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beneful IncrediBites" data-lpos="Header:Beneful IncrediBites" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Beneful%20IncrediBites&amp;srule=best-sellers" title="Refine by:Beneful IncrediBites">
Beneful IncrediBites
<span class="attribute-count"> 6 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beyond Core" data-prefv-value="Beyond Core">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beyond Core" data-lpos="Header:Beyond Core" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Beyond%20Core&amp;srule=best-sellers" title="Refine by:Beyond Core">
Beyond Core
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Beyond Simply" data-prefv-value="Beyond Simply">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Beyond Simply" data-lpos="Header:Beyond Simply" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Beyond%20Simply&amp;srule=best-sellers" title="Refine by:Beyond Simply">
Beyond Simply
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Blue Buffalo Life Protection Formula" data-prefv-value="Blue Buffalo Life Protection Formula">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Blue Buffalo Life Protection Formula" data-lpos="Header:Blue Buffalo Life Protection Formula" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Blue%20Buffalo%20Life%20Protection%20Formula&amp;srule=best-sellers" title="Refine by:Blue Buffalo Life Protection Formula">
Blue Buffalo Life Protection Formula
<span class="attribute-count"> 21 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Blue Buffalo Tastefuls" data-prefv-value="Blue Buffalo Tastefuls">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Blue Buffalo Tastefuls" data-lpos="Header:Blue Buffalo Tastefuls" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Blue%20Buffalo%20Tastefuls&amp;srule=best-sellers" title="Refine by:Blue Buffalo Tastefuls">
Blue Buffalo Tastefuls
<span class="attribute-count"> 52 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Blue Buffalo True Chews" data-prefv-value="Blue Buffalo True Chews">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Blue Buffalo True Chews" data-lpos="Header:Blue Buffalo True Chews" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Blue%20Buffalo%20True%20Chews&amp;srule=best-sellers" title="Refine by:Blue Buffalo True Chews">
Blue Buffalo True Chews
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Blue Buffalo Wilderness" data-prefv-value="Blue Buffalo Wilderness">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Blue Buffalo Wilderness" data-lpos="Header:Blue Buffalo Wilderness" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Blue%20Buffalo%20Wilderness&amp;srule=best-sellers" title="Refine by:Blue Buffalo Wilderness">
Blue Buffalo Wilderness
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="CANIDAE All Life Stages" data-prefv-value="CANIDAE All Life Stages">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="CANIDAE All Life Stages" data-lpos="Header:CANIDAE All Life Stages" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=CANIDAE%20All%20Life%20Stages&amp;srule=best-sellers" title="Refine by:CANIDAE All Life Stages">
CANIDAE All Life Stages
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="CANIDAE Pure" data-prefv-value="CANIDAE Pure">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="CANIDAE Pure" data-lpos="Header:CANIDAE Pure" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=CANIDAE%20Pure&amp;srule=best-sellers" title="Refine by:CANIDAE Pure">
CANIDAE Pure
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Dura Chew" data-prefv-value="Dura Chew">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Dura Chew" data-lpos="Header:Dura Chew" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Dura%20Chew&amp;srule=best-sellers" title="Refine by:Dura Chew">
Dura Chew
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Ensembles" data-prefv-value="Ensembles">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Ensembles" data-lpos="Header:Ensembles" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Ensembles&amp;srule=best-sellers" title="Refine by:Ensembles">
Ensembles
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Feliway Classic" data-prefv-value="Feliway Classic">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Feliway Classic" data-lpos="Header:Feliway Classic" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Feliway%20Classic&amp;srule=best-sellers" title="Refine by:Feliway Classic">
Feliway Classic
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Feliway Friends" data-prefv-value="Feliway Friends">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Feliway Friends" data-lpos="Header:Feliway Friends" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Feliway%20Friends&amp;srule=best-sellers" title="Refine by:Feliway Friends">
Feliway Friends
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Feliway Optimum" data-prefv-value="Feliway Optimum">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Feliway Optimum" data-lpos="Header:Feliway Optimum" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Feliway%20Optimum&amp;srule=best-sellers" title="Refine by:Feliway Optimum">
Feliway Optimum
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Flavor Frenzy" data-prefv-value="Flavor Frenzy">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Flavor Frenzy" data-lpos="Header:Flavor Frenzy" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Flavor%20Frenzy&amp;srule=best-sellers" title="Refine by:Flavor Frenzy">
Flavor Frenzy
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Gently Cooked" data-prefv-value="Gently Cooked">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Gently Cooked" data-lpos="Header:Gently Cooked" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Gently%20Cooked&amp;srule=best-sellers" title="Refine by:Gently Cooked">
Gently Cooked
<span class="attribute-count"> 15 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hill's Science Diet Healthy Mobility" data-prefv-value="Hill's Science Diet Healthy Mobility">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hill's Science Diet Healthy Mobility" data-lpos="Header:Hill's Science Diet Healthy Mobility" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Hill%27s%20Science%20Diet%20Healthy%20Mobility&amp;srule=best-sellers" title="Refine by:Hill's Science Diet Healthy Mobility">
Hill's Science Diet Healthy Mobility
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hill's Science Diet Multiple Benefit" data-prefv-value="Hill's Science Diet Multiple Benefit">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hill's Science Diet Multiple Benefit" data-lpos="Header:Hill's Science Diet Multiple Benefit" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Hill%27s%20Science%20Diet%20Multiple%20Benefit&amp;srule=best-sellers" title="Refine by:Hill's Science Diet Multiple Benefit">
Hill's Science Diet Multiple Benefit
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hill's Science Diet Perfect Digestion" data-prefv-value="Hill's Science Diet Perfect Digestion">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hill's Science Diet Perfect Digestion" data-lpos="Header:Hill's Science Diet Perfect Digestion" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Hill%27s%20Science%20Diet%20Perfect%20Digestion&amp;srule=best-sellers" title="Refine by:Hill's Science Diet Perfect Digestion">
Hill's Science Diet Perfect Digestion
<span class="attribute-count"> 7 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hill's Science Diet Perfect Weight" data-prefv-value="Hill's Science Diet Perfect Weight">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hill's Science Diet Perfect Weight" data-lpos="Header:Hill's Science Diet Perfect Weight" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Hill%27s%20Science%20Diet%20Perfect%20Weight&amp;srule=best-sellers" title="Refine by:Hill's Science Diet Perfect Weight">
Hill's Science Diet Perfect Weight
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Hill's Science Diet Senior Vitality" data-prefv-value="Hill's Science Diet Senior Vitality">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Hill's Science Diet Senior Vitality" data-lpos="Header:Hill's Science Diet Senior Vitality" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Hill%27s%20Science%20Diet%20Senior%20Vitality&amp;srule=best-sellers" title="Refine by:Hill's Science Diet Senior Vitality">
Hill's Science Diet Senior Vitality
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct Freeze Dried" data-prefv-value="Instinct Freeze Dried">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct Freeze Dried" data-lpos="Header:Instinct Freeze Dried" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Instinct%20Freeze%20Dried&amp;srule=best-sellers" title="Refine by:Instinct Freeze Dried">
Instinct Freeze Dried
<span class="attribute-count"> 10 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct Limited Ingredient" data-prefv-value="Instinct Limited Ingredient">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct Limited Ingredient" data-lpos="Header:Instinct Limited Ingredient" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Instinct%20Limited%20Ingredient&amp;srule=best-sellers" title="Refine by:Instinct Limited Ingredient">
Instinct Limited Ingredient
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct Original" data-prefv-value="Instinct Original">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct Original" data-lpos="Header:Instinct Original" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Instinct%20Original&amp;srule=best-sellers" title="Refine by:Instinct Original">
Instinct Original
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct Raw Boost" data-prefv-value="Instinct Raw Boost">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct Raw Boost" data-lpos="Header:Instinct Raw Boost" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Instinct%20Raw%20Boost&amp;srule=best-sellers" title="Refine by:Instinct Raw Boost">
Instinct Raw Boost
<span class="attribute-count"> 38 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct Raw Frozen" data-prefv-value="Instinct Raw Frozen">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct Raw Frozen" data-lpos="Header:Instinct Raw Frozen" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Instinct%20Raw%20Frozen&amp;srule=best-sellers" title="Refine by:Instinct Raw Frozen">
Instinct Raw Frozen
<span class="attribute-count"> 8 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Instinct Ultimate Protein" data-prefv-value="Instinct Ultimate Protein">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Instinct Ultimate Protein" data-lpos="Header:Instinct Ultimate Protein" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Instinct%20Ultimate%20Protein&amp;srule=best-sellers" title="Refine by:Instinct Ultimate Protein">
Instinct Ultimate Protein
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nulo MedalSeries" data-prefv-value="Nulo MedalSeries">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nulo MedalSeries" data-lpos="Header:Nulo MedalSeries" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Nulo%20MedalSeries&amp;srule=best-sellers" title="Refine by:Nulo MedalSeries">
Nulo MedalSeries
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutrience Freeze-Dried" data-prefv-value="Nutrience Freeze-Dried">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutrience Freeze-Dried" data-lpos="Header:Nutrience Freeze-Dried" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Nutrience%20Freeze-Dried&amp;srule=best-sellers" title="Refine by:Nutrience Freeze-Dried">
Nutrience Freeze-Dried
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutrience Limited Ingredient" data-prefv-value="Nutrience Limited Ingredient">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutrience Limited Ingredient" data-lpos="Header:Nutrience Limited Ingredient" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Nutrience%20Limited%20Ingredient&amp;srule=best-sellers" title="Refine by:Nutrience Limited Ingredient">
Nutrience Limited Ingredient
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Nutrience SubZero" data-prefv-value="Nutrience SubZero">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Nutrience SubZero" data-lpos="Header:Nutrience SubZero" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Nutrience%20SubZero&amp;srule=best-sellers" title="Refine by:Nutrience SubZero">
Nutrience SubZero
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Original" data-prefv-value="Original">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Original" data-lpos="Header:Original" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Original&amp;srule=best-sellers" title="Refine by:Original">
Original
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Paws for Pet Health" data-prefv-value="Paws for Pet Health">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Paws for Pet Health" data-lpos="Header:Paws for Pet Health" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Paws%20for%20Pet%20Health&amp;srule=best-sellers" title="Refine by:Paws for Pet Health">
Paws for Pet Health
<span class="attribute-count"> 31 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan Bright Mind" data-prefv-value="Pro Plan Bright Mind">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan Bright Mind" data-lpos="Header:Pro Plan Bright Mind" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20Bright%20Mind&amp;srule=best-sellers" title="Refine by:Pro Plan Bright Mind">
Pro Plan Bright Mind
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan Development" data-prefv-value="Pro Plan Development">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan Development" data-lpos="Header:Pro Plan Development" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20Development&amp;srule=best-sellers" title="Refine by:Pro Plan Development">
Pro Plan Development
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan Essentials" data-prefv-value="Pro Plan Essentials">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan Essentials" data-lpos="Header:Pro Plan Essentials" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20Essentials&amp;srule=best-sellers" title="Refine by:Pro Plan Essentials">
Pro Plan Essentials
<span class="attribute-count"> 4 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan LIVECLEAR" data-prefv-value="Pro Plan LIVECLEAR">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan LIVECLEAR" data-lpos="Header:Pro Plan LIVECLEAR" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20LIVECLEAR&amp;srule=best-sellers" title="Refine by:Pro Plan LIVECLEAR">
Pro Plan LIVECLEAR
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan Senior" data-prefv-value="Pro Plan Senior">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan Senior" data-lpos="Header:Pro Plan Senior" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20Senior&amp;srule=best-sellers" title="Refine by:Pro Plan Senior">
Pro Plan Senior
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan Specialized" data-prefv-value="Pro Plan Specialized">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan Specialized" data-lpos="Header:Pro Plan Specialized" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20Specialized&amp;srule=best-sellers" title="Refine by:Pro Plan Specialized">
Pro Plan Specialized
<span class="attribute-count"> 13 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan SPORT" data-prefv-value="Pro Plan SPORT">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan SPORT" data-lpos="Header:Pro Plan SPORT" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20SPORT&amp;srule=best-sellers" title="Refine by:Pro Plan SPORT">
Pro Plan SPORT
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Pro Plan Vital Systems" data-prefv-value="Pro Plan Vital Systems">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Pro Plan Vital Systems" data-lpos="Header:Pro Plan Vital Systems" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Pro%20Plan%20Vital%20Systems&amp;srule=best-sellers" title="Refine by:Pro Plan Vital Systems">
Pro Plan Vital Systems
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina One +Plus" data-prefv-value="Purina One +Plus">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina One +Plus" data-lpos="Header:Purina One +Plus" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Purina%20One%20%2BPlus&amp;srule=best-sellers" title="Refine by:Purina One +Plus">
Purina One +Plus
<span class="attribute-count"> 3 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina One Everyday Nutrition" data-prefv-value="Purina One Everyday Nutrition">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina One Everyday Nutrition" data-lpos="Header:Purina One Everyday Nutrition" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Purina%20One%20Everyday%20Nutrition&amp;srule=best-sellers" title="Refine by:Purina One Everyday Nutrition">
Purina One Everyday Nutrition
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina One True Instinct" data-prefv-value="Purina One True Instinct">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina One True Instinct" data-lpos="Header:Purina One True Instinct" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Purina%20One%20True%20Instinct&amp;srule=best-sellers" title="Refine by:Purina One True Instinct">
Purina One True Instinct
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina Tidy Cats 4-in-1 Strength" data-prefv-value="Purina Tidy Cats 4-in-1 Strength">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina Tidy Cats 4-in-1 Strength" data-lpos="Header:Purina Tidy Cats 4-in-1 Strength" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Purina%20Tidy%20Cats%204-in-1%20Strength&amp;srule=best-sellers" title="Refine by:Purina Tidy Cats 4-in-1 Strength">
Purina Tidy Cats 4-in-1 Strength
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina Tidy Cats Free &amp; Clean Unscented" data-prefv-value="Purina Tidy Cats Free &amp; Clean Unscented">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina Tidy Cats Free &amp; Clean Unscented" data-lpos="Header:Purina Tidy Cats Free &amp; Clean Unscented" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Purina%20Tidy%20Cats%20Free%20%26%20Clean%20Unscented&amp;srule=best-sellers" title="Refine by:Purina Tidy Cats Free &amp; Clean Unscented">
Purina Tidy Cats Free & Clean Unscented
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Purina Tidy Cats with Glade" data-prefv-value="Purina Tidy Cats with Glade">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Purina Tidy Cats with Glade" data-lpos="Header:Purina Tidy Cats with Glade" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Purina%20Tidy%20Cats%20with%20Glade&amp;srule=best-sellers" title="Refine by:Purina Tidy Cats with Glade">
Purina Tidy Cats with Glade
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Royal Canin Feline Breed Nutrition" data-prefv-value="Royal Canin Feline Breed Nutrition">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Royal Canin Feline Breed Nutrition" data-lpos="Header:Royal Canin Feline Breed Nutrition" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Royal%20Canin%20Feline%20Breed%20Nutrition&amp;srule=best-sellers" title="Refine by:Royal Canin Feline Breed Nutrition">
Royal Canin Feline Breed Nutrition
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Royal Canin Feline Care Nutrition" data-prefv-value="Royal Canin Feline Care Nutrition">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Royal Canin Feline Care Nutrition" data-lpos="Header:Royal Canin Feline Care Nutrition" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Royal%20Canin%20Feline%20Care%20Nutrition&amp;srule=best-sellers" title="Refine by:Royal Canin Feline Care Nutrition">
Royal Canin Feline Care Nutrition
<span class="attribute-count"> 9 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Royal Canin Feline Health Nutrition" data-prefv-value="Royal Canin Feline Health Nutrition">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Royal Canin Feline Health Nutrition" data-lpos="Header:Royal Canin Feline Health Nutrition" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Royal%20Canin%20Feline%20Health%20Nutrition&amp;srule=best-sellers" title="Refine by:Royal Canin Feline Health Nutrition">
Royal Canin Feline Health Nutrition
<span class="attribute-count"> 12 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Royal Canin Puppy &amp; Kitten" data-prefv-value="Royal Canin Puppy &amp; Kitten">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Royal Canin Puppy &amp; Kitten" data-lpos="Header:Royal Canin Puppy &amp; Kitten" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Royal%20Canin%20Puppy%20%26%20Kitten&amp;srule=best-sellers" title="Refine by:Royal Canin Puppy &amp; Kitten">
Royal Canin Puppy & Kitten
<span class="attribute-count"> 1 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Simply Nourish Limited Ingredient Diet" data-prefv-value="Simply Nourish Limited Ingredient Diet">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Simply Nourish Limited Ingredient Diet" data-lpos="Header:Simply Nourish Limited Ingredient Diet" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Simply%20Nourish%20Limited%20Ingredient%20Diet&amp;srule=best-sellers" title="Refine by:Simply Nourish Limited Ingredient Diet">
Simply Nourish Limited Ingredient Diet
<span class="attribute-count"> 2 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Simply Nourish Original" data-prefv-value="Simply Nourish Original">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Simply Nourish Original" data-lpos="Header:Simply Nourish Original" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Simply%20Nourish%20Original&amp;srule=best-sellers" title="Refine by:Simply Nourish Original">
Simply Nourish Original
<span class="attribute-count"> 11 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Simply Nourish Source" data-prefv-value="Simply Nourish Source">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Simply Nourish Source" data-lpos="Header:Simply Nourish Source" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Simply%20Nourish%20Source&amp;srule=best-sellers" title="Refine by:Simply Nourish Source">
Simply Nourish Source
<span class="attribute-count"> 5 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="WD" data-prefv-value="WD">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="WD" data-lpos="Header:WD" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=WD&amp;srule=best-sellers" title="Refine by:WD">
WD
<span class="attribute-count"> 36 </span>
</a>
</li>
<li class="deselected client-side-deselected" data-prefv="Wellness CORE" data-prefv-value="Wellness CORE">
<a class="refinement-checkbox" data-eventname="Refinement_Event" data-lid="Wellness CORE" data-lpos="Header:Wellness CORE" data-link-type="o" href="https://www.petsmart.ca/sale/june/?pmin=0.01&amp;prefn1=customSeries&amp;prefv1=Wellness%20CORE&amp;srule=best-sellers" title="Refine by:Wellness CORE">
Wellness CORE
<span class="attribute-count"> 10 </span>
</a>
</li>
</ul>
<a href="#" class="see-all-refinements" aria-label="View More Series">View More</a>

</div>
</div>
</div>
</div>
</div>
<div class="primary-content col-lg-12 plp-seo-bg">
<div>
</div>
</div>
</div>
</div>
<div id="tabs-2" class="articles">
<div id="primary-article" class="primary-content col-lg-9">
</div>
<div id="secondary-article" class="refinements col-lg-3 col-md-3">
<div class="refinement-container">
</div>
</div>
</div>
</div>
</div>
</div>
`;
