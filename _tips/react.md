# React

## input onChange 이벤트 시, focus out 현상

```js

interface Props {
  state: StateType
  setState: (state: StateType) => void
}

const Component = ({ state, setState }: Props) => {

  const setStateByKey = (
    key: keyof StateType,
    value: StateType[keyof StateType],
  ) => {
    setState({ ...state, [key]: value })
  }

  const updateEmail = (index: number, value: string) => {
      const target = [...item.emails]
      target[index] = value
      setStateByKey('emails', target)
    }

  return (
    <div>
        {state.emails.map((email, index) => (
            <div key={`${email}_${index}`}>
                <TextInput
                  value={email}
                  onChange={(event) => updateEmail(index, event.target.value)}
                />
            </div>
        ))}
    </div>
  )
}

export default Component
```

위 코드는 다음과 같은 기능을 합니다.

- 부모 컴포넌트로부터 state를 받아오고 있습니다.
- 해당 state를 map으로 순회하며 컴포넌트를 그립니다.
  - state 값을 input value로 사용하고, onChange에서 state의 일부를 변경하는 로직을 가지고 있습니다.

하지만, 위 컴포넌트를 동작시켜보면, 한 글자를 입력할 때마다 focus를 잃는 문제가 발생합니다.

이유는 key 값에 있습니다.

위 코드에서는 key 값을 `key={`${email}_${index}`}`와 같이 정의하고 있습니다.<br>
onChange를 통해 email 값을 변경하기 때문에 key 값이 매번 변경되어 Input 컴포넌트가 재렌더링되면서 focus를 잃습니다.<br>
그렇기에 key 값은 state에 영향을 받지 않도록 `key=${index.toString()}`과 같이 작성해야 합니다.

그 외에 어떤 형태로든 상태가 변경될 때마다 Input 컴포넌트가 재생성되지 않도록 해야 합니다.

- 컴포넌트 내부에서 `const Input = () => {}`과 같이 선언하거나
- 마찬가지로 styled-component 객체를 jsx 컴포넌트 내부에서 선언하거나
