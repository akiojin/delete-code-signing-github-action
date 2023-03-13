# delete-code-signing-github-action

![BuildAndTest](https://github.com/akiojin/delete-code-signing-github-action/actions/workflows/BuildAndTest.yml/badge.svg)

This action removes installed certificates.

## Usage

### 

```yml
- uses: akiojin/delete-code-signing-github-action@v0.1.0
  with:
    type: Development
    creator: Akio Jinsenji
```

## Arguments

### Inputs

| Name      | Required | Type     | Description                                                                      |
| --------- | -------- | -------- | -------------------------------------------------------------------------------- |
| `type`    | `true`   | `string` | Specify the type of certificate. Possible options are: Development, Distribution |
| `creator` | `true`   | `string` | Specifies the creator of the certificate.                                        |

## License

Any contributions made under this project will be governed by the [MIT License](https://github.com/akiojin/delete-code-signing-github-action/blob/main/LICENSE).
