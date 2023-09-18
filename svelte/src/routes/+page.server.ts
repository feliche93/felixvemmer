import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import z from 'zod';

const schema = z.object({
  name: z.string().min(2).default('Hello world!'),
  email: z.string().email()
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, always return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated data

    // Yep, return { form } here too
    return { form };
  }
};