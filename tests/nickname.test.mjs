import test from 'node:test';
import assert from 'node:assert/strict';
import {nicknameValue,nicknameError} from '../data.js';
test('Nicknames accept Korean and common pseudonyms, normalize spaces, and reject empty input',()=>{assert.equal(nicknameValue('  파란   하늘  '),'파란 하늘');for(const name of ['새봄','파란 하늘','M365_도전-1','새'.repeat(20)])assert.equal(nicknameError(name),'');for(const name of ['',null,{},'   '])assert.ok(nicknameError(name));});
test('Nickname validation enforces bounds and blocks markup and hidden formatting',()=>{for(const name of ['새'.repeat(21),'<script>alert(1)</script>','이름\u202e관리자','이름\u200b','name@example.com'])assert.ok(nicknameError(name));assert.equal(nicknameValue('ＡＢＣ１２３'),'ABC123');});
