export function toggleAnyManu(btnId, headerMenuId) {
  const btn = document.querySelector(`#${btnId}`);
  const Manu = document.querySelector(`#${headerMenuId}`);
  if (!btn || !Manu) return;

  btn.addEventListener("click", function () {
    Manu.classList.toggle("active");
    btn.classList.toggle("active");
  });
}