(function ($, w, d, h, b) {
    $(document).ready(function () {

        /**
         * Construct.
         */
        __construct = () => {
            onScrollFixed();

            /// specific for homepage
            if ($(b).hasClass('home')) {
            }

            // AOS.init({ disable: 'mobile' });
        }
        onScrollFixed = () => {

            this.onScrollFixed = () => {
                const $header = $('.header');

                $(w).on('load scroll', function () {
                    let currentScroll = w.pageYOffset || d.documentElement.scrollTop;
                    let isDesktop = w.matchMedia('(min-width: 992px)').matches;

                    if (isDesktop) {
                        if (currentScroll > 0) {
                            $header.addClass('header-float');
                        }
                        else {
                            $header.removeClass('header-float');
                        }
                    }
                    else {
                        $header.removeClass('header-float');
                    }

                });
            }
            this.onScrollFixed();
        }
    


        /**
         * Instantiate
         */
        __construct();

    });

    $(window).on('load', function () {
        $('body').addClass('site-loaded');
    });

})(jQuery, window, document, 'html', 'body');