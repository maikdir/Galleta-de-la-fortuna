angular.module('app', [])
    .controller('MainController', function ($scope, $http) {

        const api = 'http://localhost:8001/api';

        $scope.loginData = {};
        $scope.currentUser = JSON.parse(sessionStorage.getItem('user'));
        $scope.frase = "";
        $scope.formFrase = {body: ""};

        $scope.login = function () {
            $http.post(api + '/login', $scope.loginData)
                .then(function (res) {
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                    $scope.currentUser = res.data.user;

                    if( $scope.currentUser.role=== 'admin'){
                        $scope.loadSuggestions();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    alert("Email o contraseña incorrectos");
                });
        };

        $scope.logout = function () {
            sessionStorage.clear();
            $scope.currentUser = null;
            $scope.frase = "";
            $scope.fraseData = null;
        };

        $scope.getFrase = function () {
            $http.get(api + '/frase')
                .then(function (res) {
                    console.log(res.data);

                    if(res.data.frase){
                        $scope.frase = res.data.frase.body;
                        $scope.fraseData = res.data.frase;
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    alert("No se pudo abrir la galleta");
                });
        };

        $scope.addFrase = function () {
            console.log("Nueva frase:", $scope.formFrase.body);

            if (!$scope.formFrase.body|| $scope.formFrase.body.trim() === "") {
                alert("La frase no puede estar vacía.");
                return;
            }

            $http.post(api + '/frases', {
                body: $scope.formFrase.body,
                created_by: $scope.currentUser.name
            })
                .then(function () {
                    $scope.mensaje = "Frase agregada correctamente";
                    $scope.formFrase.body = "";
                })
                .catch(function (err) {
                    console.log(err);
                    alert(JSON.stringify(err.data));
                });
        };

        $scope.suggestion = { body: "" };

        $scope.sendSuggestion = function () {
            $http.post(api + '/suggestions', {
                body: $scope.suggestion.body,
                created_by: $scope.currentUser.name
            })
                .then(function () {
                    alert("Sugerencia enviada. Quedará pendiente de aprobación.");
                    $scope.suggestion.body = "";
                })
                .catch(function (err) {
                    alert(err.data.error || "No se pudo enviar la sugerencia");
                });
        };

        $scope.suggestions = [];

        $scope.loadSuggestions = function () {
            $http.get(api + '/suggestions')
                .then(function (res) {
                    $scope.suggestions = res.data;
                });
        };

        $scope.approve = function (id) {
            $http.post(api + '/suggestions/' + id + '/approve')
                .then(function () {
                    alert("Aprobada");
                    $scope.loadSuggestions();
                });
        };

        if ($scope.currentUser && $scope.currentUser.role === 'admin') {
            $scope.loadSuggestions();
        }

        $scope.reject = function (id) {
            $http.post(api + '/suggestions/' + id + '/reject')
                .then(function () {
                    alert("Sugerencia rechazada");
                    $scope.loadSuggestions();
                })
                .catch(function (err) {
                    console.log(err);
                    alert("No se pudo rechazar la sugerencia");
                });
        };


        $scope.frases = [];
        $scope.approvedSuggestions = [];
        $scope.rejectedSuggestions = [];

        $scope.showSection = "";

        $scope.loadFrases = function () {
            $scope.showSection = "frases";

            $http.get(api + '/frases')
                .then(function (res) {
                    $scope.frases = res.data;
                });
        };

        $scope.loadApprovedSuggestions = function () {
            $scope.showSection = "approved";

            $http.get(api + '/suggestions/approved')
                .then(function (res) {
                    $scope.approvedSuggestions = res.data;
                });
        };

        $scope.loadRejectedSuggestions = function () {
            $scope.showSection = "rejected";

            $http.get(api + '/suggestions/rejected')
                .then(function (res) {
                    $scope.rejectedSuggestions = res.data;
                });
        };


        $scope.editingFrase = null;
        $scope.editForm = { body: "" };

        $scope.startEditFrase = function (frase) {
            $scope.editingFrase = frase.id;
            $scope.editForm.body = frase.body;
        };

        $scope.cancelEditFrase = function () {
            $scope.editingFrase = null;
            $scope.editedBody = "";
        };

        $scope.updateFrase = function (id) {
            if (!$scope.editForm.body || $scope.editForm.body.trim() === "") {
                alert("La frase no puede estar vacía.");
                return;
            }

            $http.put(api + '/frases/' + id, {
                body: $scope.editForm.body
            })
                .then(function (res) {
                    console.log("UPDATE RESPONSE:", res.data);
                    alert("Frase actualizada");

                    $scope.editingFrase = null;
                    $scope.editForm.body = "";
                    $scope.loadFrases();
                })
                .catch(function (err) {
                    console.log(err);
                    alert(err.data.error || "No se pudo actualizar la frase");
                });
        };

        $scope.deleteFrase = function (id) {
            if (!confirm("¿Seguro que querés eliminar esta frase?")) {
                return;
            }

            $http.delete(api + '/frases/' + id)
                .then(function () {
                    alert("Frase eliminada");
                    $scope.loadFrases();
                })
                .catch(function () {
                    alert("No se pudo eliminar la frase");
                });
        };
    });