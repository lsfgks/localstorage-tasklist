function recTarefas (){

	var tarefas = JSON.parse(localStorage.getItem('tarefas'));
	var listaDeTarefas = document.getElementById('listaDeTarefas');

	listaDeTarefas.innerHTML = '';

	for (var i=0; i < tarefas.length; i++) {
		var id = tarefas[i].id;
		var titulo = tarefas[i].titulo;
		var desc = tarefas[i].descricao;
		var urgencia = tarefas[i].urgencia;
		var atribuidoA = tarefas[i].atribuidoA;
		var card = tarefas[i].card;
		var status = tarefas[i].status;

		listaDeTarefas.innerHTML +=		'<div class="col s12 m6"><div class="card s6 \' '+card+' \'z-depth-2"><div class="card-content white-text">'+
										'<h5>' + titulo + '</h5>'+
										'<h6>' + desc + '</h6>'+
										'<p><span class="new badge green" data-badge-caption="">' + status + '</span></p>'+
										'<p><i class="material-icons md-14">access_time</i> ' + urgencia + ' </br> '+
										'<i class="material-icons md-14">account_circle</i> ' + atribuidoA + '</p></br>'+
										'<a href="#" class="waves-effect waves-light btn green lighten-1 col s6" onclick="statusConcluido(\''+id+'\')"><i class="material-icons md-14 right">check</i>Concluir</a>'+ 
			                            '<a href="#" class="waves-effect waves-light btn red lighten-1 col s6" onclick="apagarTarefa(\''+id+'\')"><i class="material-icons md-14 right">backspace</i>Apagar</a> '+
			                           	'</div></div></div>';
	}

}

document.getElementById('inputTarefas').addEventListener('submit', salvarTarefa);


function salvarTarefa(e) {
	var idTarefa = chance.guid();
	var tituloTarefa = document.getElementById('inputTituloTarefa').value;
	var descTarefa = document.getElementById('inputDescTarefa').value;
	var urgenciaTarefa = document.getElementById('inputUrgenciaTarefa').value;
	var atribuidoATarefa = document.getElementById('inputAtribuidoATarefa').value;
	var corDoCard = document.getElementById('inputCorDoCard').value;
	var statusTarefa = 'Aberta';


	var tarefa = {
		id: idTarefa,
		titulo: tituloTarefa,
		descricao: descTarefa,
		urgencia: urgenciaTarefa,
		atribuidoA: atribuidoATarefa,
		card: corDoCard,
		status: statusTarefa
	}

  if (localStorage.getItem('tarefas') === null) {
    var tarefas = [];
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  } else {
    var tarefas = JSON.parse(localStorage.getItem('tarefas'));
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

	document.getElementById('inputTarefas').reset();

	recTarefas();

	e.preventDefault();

}

function statusConcluido (id) {
  var tarefas = JSON.parse(localStorage.getItem('tarefas'));
  
  for(var i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == id) {
      tarefas[i].status = "Concluída";
    }
  }
    
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  
  recTarefas();
}	

function apagarTarefa (id) {
  var tarefas = JSON.parse(localStorage.getItem('tarefas'));
  
  for(var i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id == id) {
      tarefas.splice(i, 1);
    }
  }
  
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  
  recTarefas();
}