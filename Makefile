SHELL := /bin/bash

.PHONY: help install lint test clean

help:
	@echo "Available commands:"
	@echo "  install    Install dependencies"
	@echo "  lint       Run linting checks"
	@echo "  test       Run tests"
	@echo "  clean      Clean up build artifacts"

install:
	pip install -e ".[dev]"

lint:
	black --check src/
	flake8 src/
	mypy src/

test:
	pytest

clean:
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info/
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
