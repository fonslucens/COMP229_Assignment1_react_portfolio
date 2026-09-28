import test from "node:test";
import assert from "node:assert/strict";
import { validateContact } from "../src/utils/validateContact.js";

const valid = { firstName: "Test", lastName: "Student", contactNumber: "+1 (416) 555-0123", email: "student@example.com", message: "Testing the contact form." };

test("accepts valid contact data", () => {
  assert.deepEqual(validateContact(valid), {});
});
test("rejects all five empty required fields", () => {
  const errors = validateContact({ firstName: "", lastName: "", contactNumber: "", email: "", message: "" });
  assert.equal(Object.keys(errors).length, 5);
});
test("rejects whitespace-only names and message", () => {
  const errors = validateContact({ ...valid, firstName: "  ", lastName: "  ", message: "     " });
  assert.ok(errors.firstName && errors.lastName && errors.message);
});
test("rejects malformed email addresses", () => {
  for (const email of ["student", "student@", "@example.com", "student @example.com", "student@example"]) {
    assert.ok(validateContact({ ...valid, email }).email);
  }
});
test("accepts common phone formatting but rejects letters and wrong digit counts", () => {
  assert.equal(validateContact({ ...valid, contactNumber: "+82 10 1234 5678" }).contactNumber, undefined);
  for (const contactNumber of ["abc1234567", "123", "1234567890123456"]) {
    assert.ok(validateContact({ ...valid, contactNumber }).contactNumber);
  }
});
test("checks message length boundaries", () => {
  assert.ok(validateContact({ ...valid, message: "abcd" }).message);
  assert.equal(validateContact({ ...valid, message: "abcde" }).message, undefined);
  assert.equal(validateContact({ ...valid, message: "a".repeat(2000) }).message, undefined);
  assert.ok(validateContact({ ...valid, message: "a".repeat(2001) }).message);
});
test("accepts international names without forcing an English-only pattern", () => {
  assert.deepEqual(validateContact({ ...valid, firstName: "지현", lastName: "김" }), {});
  assert.deepEqual(validateContact({ ...valid, lastName: "O’Connor-Smith" }), {});
});
test("does not mutate the submitted object", () => {
  const frozen = Object.freeze({ ...valid });
  validateContact(frozen);
  assert.deepEqual(frozen, valid);
});
