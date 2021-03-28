import { findIndexOfEl } from '../cdk-key-manager-mapper.utils';

export function getIndexOfFixture(className: '.a1' | '.a2' | '.a3') {
  const elWrapper = document.createElement('div');
  elWrapper.className = 'example';
  elWrapper.innerHTML = `
    <div class="a a1">1</div>
    <div class="a a2">2</div>
    <div class="a a3">3</div>
  `;

  const el = elWrapper.querySelector(className);
  const nodeList = elWrapper.querySelectorAll('.a');
  // @note: we are testing "findIndexOfEl". Everything else around are fixtures!
  return el ? findIndexOfEl(nodeList, el) : -1;
}
