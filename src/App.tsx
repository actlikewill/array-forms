import React, { useState } from 'react';
import './App.css';
import { produce } from 'immer'
import { generate } from 'shortid'

interface Person {
  id: string
  firstName: string
  lastName: string
}

function App() {


  const person = {
    firstName: 'one',
    lastName: 'two',
    id: '1'
  }
  const [people, setPeople] = useState<Person[]>([person])

  return (
    <div className="" style={{textAlign: "center"}}>
      <button
        onClick={() => {
          setPeople(currentPeople => [ ...currentPeople, {
            firstName: '',
            lastName: '',
            id: generate() 
          }])
        }}
      >add new person</button>
      {
        people.map((p, index) => {
          return (
            <div key={p.id}>
              <input 
                onChange={e => {
                  const firstName = e.target.value
                  setPeople(currentPeople => 
                    produce(currentPeople, v => {
                      v[index].firstName = firstName
                    })
                    )
                }}
                value={p.firstName} 
                placeholder="first name" />
              <input 
                onChange={e => {
                  const lastName = e.target.value
                  setPeople(currentPeople => 
                    produce(currentPeople, v => {
                      v[index].lastName = lastName
                    })
                    )
                }}
                value={p.lastName} 
                placeholder="last name" />
                <button 
                  onClick={() => {
                    setPeople(currentPeople => currentPeople.filter(x => x.id !== p.id))
                  }}
                >x</button>
            </div>
          )
        })
      }
      <pre style={{textAlign: 'left'}}>
        {
          JSON.stringify(people, null, 2)
        }
      </pre>
    </div>

  );
}

export default App;
