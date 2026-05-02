angular.module('app', [])
    .controller('MainController', function ($scope, $http) {

        const api = 'http://localhost:8001/api';

        $scope.loginData = {};
        $scope.registerData = {};
        $scope.currentUser = JSON.parse(sessionStorage.getItem('user'));
        $scope.frase = "";
        $scope.formFrase = {body: ""};
        $scope.mensaje = "";
        $scope.tipoMensaje = "";

        $scope.showMessage = function (texto, tipo) {
            $scope.mensaje = texto;
            $scope.tipoMensaje = tipo;

            setTimeout(function () {
                $scope.$apply(function () {
                    $scope.clearMessage();
                });
            }, 3000);
        };

        $scope.clearMessage = function () {
            $scope.mensaje = "";
            $scope.tipoMensaje = "";
        };


        $scope.register = function () {
            $http.post(api + '/register', $scope.registerData)
                .then(function (res) {
                    $scope.showMessage("Usuario registrado correctamente", "success");

                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                    $scope.currentUser = res.data.user;

                    $scope.registerData = {};
                })
                .catch(function (err) {
                    $scope.showMessage(err.data.error || "No se pudo registrar el usuario", "danger");
                });
        };

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
                    $scope.showMessage("Email o contraseña incorrectos", "danger");
                });
        };

        $scope.logout = function () {
            sessionStorage.clear();
            $scope.currentUser = null;
            $scope.frase = "";
            $scope.fraseData = null;
            $scope.clearMessage();
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
                    $scope.showMessage("No se pudo abrir la galleta", "danger");
                });
        };

        $scope.addFrase = function () {
            console.log("Nueva frase:", $scope.formFrase.body);

            if (!$scope.formFrase.body|| $scope.formFrase.body.trim() === "") {
                $scope.showMessage("La frase no puede estar vacía.", "warning");
                return;
            }

            $http.post(api + '/frases', {
                body: $scope.formFrase.body,
                created_by: $scope.currentUser.name
            })
                .then(function () {
                    $scope.showMessage("Frase agregada correctamente", "success");
                    $scope.formFrase.body = "";
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.showMessage(err.data.error || "Error al agregar la frase", "danger");
                });
        };

        $scope.suggestion = { body: "" };

        $scope.sendSuggestion = function () {
            $http.post(api + '/suggestions', {
                body: $scope.suggestion.body,
                created_by: $scope.currentUser.name
            })
                .then(function () {
                    $scope.showMessage("Sugerencia enviada. Quedará pendiente de aprobación.", "success");
                    $scope.suggestion.body = "";
                })
                .catch(function (err) {
                    $scope.showMessage(err.data.error || "No se pudo enviar la sugerencia", "danger");

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
                    $scope.showMessage("Sugerencia aprobada", "success");
                    $scope.loadSuggestions();
                });
        };

        if ($scope.currentUser && $scope.currentUser.role === 'admin') {
            $scope.loadSuggestions();
        }

        $scope.reject = function (id) {
            $http.post(api + '/suggestions/' + id + '/reject')
                .then(function () {
                    $scope.showMessage("Sugerencia rechazada", "warning");
                    $scope.loadSuggestions();
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.showMessage("No se pudo rechazar la sugerencia", "danger");
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
                $scope.showMessage("La frase no puede estar vacía", "warning");
                return;
            }

            $http.put(api + '/frases/' + id, {
                body: $scope.editForm.body
            })
                .then(function (res) {
                    console.log("UPDATE RESPONSE:", res.data);
                    $scope.showMessage("Frase actualizada correctamente", "success");

                    $scope.editingFrase = null;
                    $scope.editForm.body = "";
                    $scope.loadFrases();
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.showMessage(err.data.error || "No se pudo actualizar la frase", "danger");
                });
        };

        $scope.deleteFrase = function (id) {
            if (!confirm("¿Seguro que querés eliminar esta frase?")) {
                return;
            }

            $http.delete(api + '/frases/' + id)
                .then(function () {
                    $scope.showMessage("Frase eliminada correctamente", "success");
                    $scope.loadFrases();
                })
                .catch(function () {
                    $scope.showMessage("No se pudo eliminar la frase", "danger");
                });
        };
    });