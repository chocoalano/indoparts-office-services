import { test } from '@japa/runner'

test.group('Users list', () => {
  test('get a paginated list of users', async ({ client }) => {
    const response = await client.get('/users')
    response.assertBodyContains({
      "meta": {
        "total": 2,
        "per_page": 1,
        "current_page": 1,
        "last_page": 2,
        "first_page": 1,
        "first_page_url": "/?page=1",
        "last_page_url": "/?page=2",
        "next_page_url": "/?page=2",
        "previous_page_url": null
      },
      "data": [
        {
          "id": 1,
          "role_id": 1,
          "dept_id": 1,
          "name": "testing",
          "nik": "001",
          "activation": "true",
          "avatar": "testing.png",
          "created_at": "2022-05-14T11:39:13.247+07:00",
          "updated_at": "2022-05-14T11:39:13.247+07:00"
        }
      ]
    })
  })
})
