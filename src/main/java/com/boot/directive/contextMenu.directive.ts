module app{

    function showContextMenu():ng.IDirective{
        var directive = <ng.IDirective>{
            restrict:'A',
            link:link,
            template:"<ul class='custom-menu' style='list-style-type:none' "+
                        "<li>Split Out</li>"+
                        "<li>Revert Split</li>"+
                        "<li>Merge</li></ul>"
        }

        function link(scope:ng.IScope, element:ng.IAugmentedJQuery){
            element.on("contextmenu",function(event){
                event.preventDefault();
                $(".custom-menu").finish().toggle(100);

                element.css({

                    top: event.pageY - $("#topbar").height() ,
                    left: event.pageX - $("#sidebar").width()
                });
            });

            element.bind("mousedown",function(e){
                if (!($(e.target).parents(".custom-menu").length > 0)) {
                    // Hide it
                    $(".custom-menu").hide(100);
                }
            });
        }

        return directive;
    }

    angular.module("boot")
            .directive('contextMenu',showContextMenu);
}