import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    //carregando os itens 
    this.load();
  }

  add() {
    //this.form.value =>{title:'Titulo'}
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    //add nova tarefa
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();

  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos.splice(index, 1); // remover item da lista
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  // armazenamento localstorage - para persistir as informações
  save() {
    //converter todo javascritp para JSON formato string
    //converte JSON em string
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    //retornou string
    const data = localStorage.getItem('todos');
    // converte string para JSON
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }
}
