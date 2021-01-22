import React from "react"

type QuestionFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const QuestionForm = ({ initialValues, onSubmit }: QuestionFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>
        <input placeholder="Question" />
        <input placeholder="Choice 1" />
        <input placeholder="Choice 2" />
        <input placeholder="Choice 3" />
      </div>
      <div>{JSON.stringify(initialValues)}</div>
      <button>Submit</button>
    </form>
  )
}

export default QuestionForm
