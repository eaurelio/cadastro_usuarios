import React, {Component} from 'react'
import Axios from 'axios'
import Main from '../template/Main'

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: incluir, listar, alterar e excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
  user: {name: '', email: '', endereco: '', fone: '', cidade: ''},
  list: []
}

class UserCrud extends Component {
  state = {...initialState}

  componentWillMount() {
    Axios(baseUrl).then(resp => {
      this.setState({list: resp.data})
    })
  }

  clear() {
    this.setState({user: initialState.user})
  }

  save() {
    const user = this.state.user
    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    Axios[method](url, user)
      .then(resp => {
        const list = this.getUpdatedList(resp.data)
        this.setState({user: initialState.user, list})
      })
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if (add) list.unshift(user)
    return list
  }

  updateField(event) {
    const user = {...this.state.user}
    user[event.target.name] = event.target.value
    this.setState({user})
  }

  renderForm() {
    return (
      <div className="form">

        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome"/>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o e-mail"/>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Endereço</label>
              <input type="text" className="form-control" name="endereco" value={this.state.user.endereco} onChange={e => this.updateField(e)} placeholder="Digite o endereço"/>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="form-group">
              <label>Telefone</label>
              <input type="text" className="form-control" name="fone" value={this.state.user.fone} onChange={e => this.updateField(e)} placeholder="Digite o telefone"/>
            </div>
          </div>


          <div className="col-12 col-sm-6 col-lg-3">
            <div className="form-group">
              <label>Cidade</label>
              <input type="text" className="form-control" name="cidade" value={this.state.user.cidade} onChange={e => this.updateField(e)} placeholder="Digite a cidade"/>
            </div>
          </div>
        </div>
        

        <hr />

        <div className="row">
          <div className="col-12 d-flex justify-content">
            <button className="btn btn-primary" onClick = {e => this.save(e)}>
              Salvar
            </button>
            
            <button className="btn btn-secondary ml-2" onClick = {() => this.clear()}>
              Cancelar
            </button>
          </div>
        </div>

      </div>
      
    )
  }

  load(user) {
    this.setState({user})
  }

  remove(user) {
    Axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = this.getUpdatedList(user, false)
      this.setState({list})
    })
  }

  renderTable() {
    return(
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(user => {
      return(
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.endereco}</td>
          <td>{user.fone}</td>
          <td>{user.cidade}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    // console.log(this.state.list)
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}

export default UserCrud