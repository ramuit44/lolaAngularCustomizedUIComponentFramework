// require('./alert-directive.js');
describe('gui.ng.components - Alert Directive', function() {
   var $compile,
   $rootScope;

   // Load the module, which contains the directive
   beforeEach(angular.mock.module('gui.ng.components.alert'));

   // Store references to $rootScope and $compile
   // so they are available to all tests in this describe block
   beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
   }));

   describe('close button display behavior', function() {

      it('add close button if "close-button" parameter is true', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile('<gui-alert close-button="true">Hello world</gui-alert>')($rootScope);

         $rootScope.$digest();

         expect(element.html()).toContain('alert-close');
      });

      it('remove close button if "close-button" parameter is false', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile("<gui-alert close-button=\"false\">Hello world</gui-alert>")($rootScope);

         $rootScope.$digest();
         // Check that the compiled element contains the templated content
         expect(element.html()).not.toContain('alert-close"');
      });
   });

   describe('A11y with aria-hidden', function () {
      it('add aria-hidden="true" when the param is-close="true"', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile('<gui-alert is-closed="true">Hello world</gui-alert>')($rootScope);

         $rootScope.$digest();

         expect(element.find('.alert').attr('aria-hidden')).toBe('true');
      });

      it('remove aria-hidden="true" when the param is-close="false"', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile('<gui-alert is-closed="false">Hello world</gui-alert>')($rootScope);

         $rootScope.$digest();

         expect(element.find('.alert').attr('aria-hidden')).toBe('false');
      });
   });

   describe('add correct class for from the type param', function () {
      it('add class "alert-success" when param type="success"', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile('<gui-alert type="success">Hello world</gui-alert>')($rootScope);

         $rootScope.$digest();

         expect(element.find('.alert').hasClass('alert-success')).toBe(true);
      });

      it('add class "alert-warning" when param type="warning"', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile('<gui-alert type="warning">Hello world</gui-alert>')($rootScope);

         $rootScope.$digest();

         expect(element.find('.alert').hasClass('alert-warning')).toBe(true);
      });

      it('add class "alert-danger" when param type="danger"', function() {
         // Compile a piece of HTML containing the directive
         var element = $compile('<gui-alert type="danger">Hello world</gui-alert>')($rootScope);

         $rootScope.$digest();

         expect(element.find('.alert').hasClass('alert-danger')).toBe(true);
      });
   });

   describe('transclude element behavior', function () {
      it('transclude the text Hello world', function () {
         var transcludedContent = 'Hello world';
         var node = $compile('<div><gui-alert is-closed="false">' + transcludedContent + '</gui-alert></div>')($rootScope);
         var contents = node.contents();
         expect(node.find('ng-transclude').html()).toContain(transcludedContent);
      });
   });

});
