class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos();
    
  }

  eventos() {
  this.formulario.addEventListener('submit', e => {
    this.handleSubmit(e)
    
  })
}
  
  handleSubmit(e) {
    e.preventDefault()
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

   
    if(camposValidos && senhasValidas) {
      this.formulario.submit();
      alert(`Obrigado por sua incrição `)
    }
    
}
  senhasSaoValidas() {
    let valid = true

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');
    

      if (senha.value !== repetirSenha.value) {
        this.criaError( senha, `As senhas precisam ser iguais`)
        valid = false
        this.criaError( repetirSenha, `As senha  s precisam ser iguais`)
      }

      if(senha.value.length < 6 || senha.value.length > 12) {
        this.criaError( senha, `A senha precisa de ao menos 6 caracteres e no maximo 12 caracteres`)
          
      }

    return valid;
}


  camposSaoValidos () {
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove()
    }
    
    
    for(let campos of this.formulario.querySelectorAll('.validar')) {
      const label = campos.previousElementSibling.innerText;
    
      if(!campos.value) {
      this.criaError(campos, `Campo ${label} não está preenchido`)
        valid = false 
      }
      
      if(campos.classList.contains('cpf')) {
          if(!this.validaCPF(campos)) valid = false
        
      if(campos.classList.contains('usuario')) {
        if(!this.validaUsuario(campos)) valid =  false 
      }
    
     }
  }

  return valid;

}

  validaUsuario(campos) {

    const usuario = campos.value;
    const valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.criaError(campos, `Usuario deve ter entre 3 a 12 caracteres.`)
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaError(campos, "Nome de usuario precisa conter apenas caracteres e numeros")
      valid = false;
    } 

    return valid;
  }


  validaCPF(campo) {
  const cpf = new validandoCPF(campo.value)
  

    if(!cpf.valida()) {
      this.criaError(campo, "CPF invalido..")
      return false;
    }

    return true; 
}
  

criaError(campo, msg) {

   const div =  document.createElement('div')
    div.innerHTML = msg;
    div.classList.add('error-text')
    campo.insertAdjacentElement('afterend', div)

  }

 


}

const validar = new ValidaFormulario()


