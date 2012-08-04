

var demo = function() {

	var version = '1.0';

	var init = function(){

		function onDeviceReady() {

			$(document).ready(function(){
				console.log('Demo\'s ready!');
			});

			$('#dbHomePage').live('pageinit', function () {
				$('#dbCreateBtn').bind('click', function() {
					console.log('Create db...');
					createDb();
					selectDb();
				});

				$('#dbInsertBtn').bind('click', function() {
					console.log('Insert row to db...');
					insertDb();
				});

				$('#dbDeleteBtn').bind('click', function() {
					console.log('Delete row from db...');
					deleteDb();
				});
			});
		}
		document.addEventListener("deviceready", onDeviceReady, false);
	};

	var errorCB = function(err) {
		alert("Error processing SQL: "+err.code);
	};

	var logStatus = function(msg) {
	    console.log(msg);
	    $('#status').text(msg);
	};

	var createDb = function() {
		function populateDB(tx) {
		     tx.executeSql('DROP TABLE IF EXISTS DEMO');
		     tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY, data)');
		     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
		     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
		}

		function successCB() {
		    logStatus('2 rows created.');
		}

		var db = window.openDatabase("Database", "1.0", "Db Demo", 200000);
		db.transaction(populateDB, errorCB, successCB);
	};

	var selectDb = function() {
		function queryDB(tx) {
		    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
		}

		function querySuccess(tx, results) {
		    var len = results.rows.length;
		    logStatus("DEMO table: " + len + " rows found.");
		    for (var i=0; i<len; i++){
		        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
		    }
		}

		var db = window.openDatabase("Database", "1.0", "Db Demo", 200000);
		db.transaction(queryDB, errorCB);
	};

	var insertDb = function() {
		function executeDb(tx) {
		     tx.executeSql('INSERT INTO DEMO (id, data) VALUES (NULL, "New row")', [], successCB, errorCB);
		}

		function successCB(tx, results) {
			if (results.rowsAffected) {
				logStatus('Row #'+ results.insertId +' added.');
			} else {
				logStatus('no row added.');
			}
		}

		var db = window.openDatabase("Database", "1.0", "Db Demo", 200000);
		db.transaction(executeDb, errorCB);
	};

	var deleteDb = function() {
		function executeDb(tx) {
		    tx.executeSql('DELETE from DEMO where id=(SELECT max(id) FROM DEMO)', [], successCB, errorCB);
		}

		function successCB(tx, results) {
			if (results.rowsAffected) {
				logStatus('1 row deleted.');
			} else {
				logStatus('no row deleted.');
			}	    
		}

		var db = window.openDatabase("Database", "1.0", "Db Demo", 200000);
		db.transaction(executeDb, errorCB);		
	};

	return {
		init: function() {
			init();
		}
	};

}();

demo.init();