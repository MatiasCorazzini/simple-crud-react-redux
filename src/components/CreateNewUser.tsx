import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export function CreateNewUser () {

  const { addUser } = useUserActions();
  const [result, setResult] = useState <'ok' | 'ko' | null> (null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string

    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
    
  } 

  return(
    <Card style={{marginTop: "16px"}}>
      <Title>Crear Nuevo Usuario</Title>

      <form onSubmit={handleSubmit} className="">
        <br />
        <TextInput
          name="name"
          placeholder="Nombre"
        />
        <br />
        <TextInput
          name="email"
          placeholder="Email"
        />
        <br />
        <TextInput
          name="github"
          placeholder="GitHub"
        />

        <div>
          <Button
            type="submit"
            style={{marginRight: "16px", marginTop: "16px"}}
          >
            Crear usuario
          </Button>
          <span>
            { result === 'ok' && <Badge color='green'>Guardado</Badge> }
            { result === 'ko' && <Badge color='red'>Faltan datos</Badge> }
          </span>
        </div>
      </form>
    </Card>
  )
}