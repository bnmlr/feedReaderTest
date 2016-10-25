/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    describe('RSS Feeds', function() {
        /* Test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

        // test ensures that the menu element is
        // hidden by default by ensuring it has the proper class
        it('defaults hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

          /* Test ensures that the menu changes
          * visibility when the menu icon is clicked by 
          * checking the class before and after triggering a click
          */
        it('changes visibility on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

     // test ensures that when the loadFeed
     // function is called and completes its work, there is at least
     // a single .entry element within the .feed container.
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('have entries', function() {
            expect($('.feed').find($('.entry')).length).not.toBe(0);
        }); 
    });

    // Test ensures that when a new feed is loaded
    // by the loadFeed function that the content actually changes.
    describe('New Feed Selection', function() {
        var originalContent;
        //idea to nest callbacks came from https://discussions.udacity.com/t/last-spec-in-feedreader-js/14575/4?u=benm
        beforeEach(function(done) {
            loadFeed(0, function(){
                originalContent = $('.header-title').html();
                loadFeed(1, done);
            });
        });
        //compares content from new loadFeed to content from old
        it('changes content', function() {
            var newContent = $('.header-title').html();
            expect(originalContent).not.toEqual(newContent);
        });
    });
}());
