$(function() {
    $(document).on('click', 'a.nav-link.nav-dropdown-toggle', function() {
        const list = $(this).siblings('ul');
        const currentHeight = parseInt(list.css('max-height'));
        const setHeight = !currentHeight ? '1500px' : '0px';
        list.css('max-height', setHeight);
    });
});