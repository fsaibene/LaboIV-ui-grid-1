angular
  .module('app')
  .controller('confTP', function($scope, data, i18nService, uiGridConstants) {
    $scope.titulo = "Configuracion Campos";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    data.data().then(function(rta){
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });

    console.log(uiGridConstants);

    function columnDefs () {
      return [
        { field: 'id', name: '#', width: 45},
        { field: 'titulo', name: 'ocupacion'
          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...'
          }
        },
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'foto', cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"}, 
        { field: 'avatar', cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"}, 
        { field: 'email', name: 'mail'},
        { field: 'sexo', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: 'Male', label: 'Masculino'},
              {value: 'Female', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexoTP'
        },
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        },
        {
          name:'Ubicacion',
          cellTemplate: '<div><button ng-click="grid.appScope.mostrarFila(row.entity)">Location</button></div>'
        }
      ];
    }
    $scope.mostrarFila=function(obj){
      //console.log(obj.latitud);
      //console.log(obj.logitud);
      map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8});
  };
});
